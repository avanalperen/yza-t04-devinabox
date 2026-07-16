alter table public.projects
  add column if not exists bootcamp_report jsonb;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'projects_bootcamp_report_object_check'
      and conrelid = 'public.projects'::regclass
  ) then
    alter table public.projects
      add constraint projects_bootcamp_report_object_check
      check (
        bootcamp_report is null
        or jsonb_typeof(bootcamp_report) = 'object'
      );
  end if;
end;
$$;

create or replace function public.consume_rate_limit(
  p_bucket text
)
returns table (allowed boolean, retry_after_seconds integer)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_owner_id uuid := (select auth.uid());
  v_now timestamptz := clock_timestamp();
  v_window_started_at timestamptz;
  v_request_count integer;
  v_limit integer;
  v_window_seconds integer := 60;
begin
  if v_owner_id is null then
    raise insufficient_privilege using message = 'Authentication required';
  end if;

  v_limit := case p_bucket
    when 'ai:generation-jobs' then 5
    when 'ai:generate' then 5
    when 'ai:regenerate' then 10
    when 'ai:bootcamp' then 5
    when 'projects:create' then 30
    else null
  end;

  if v_limit is null then
    raise invalid_parameter_value using message = 'Invalid rate limit bucket';
  end if;

  insert into public.rate_limit_buckets as rate_limit (
    owner_id,
    bucket,
    window_started_at,
    request_count
  )
  values (v_owner_id, p_bucket, v_now, 1)
  on conflict (owner_id, bucket) do update
  set
    window_started_at = case
      when rate_limit.window_started_at <=
        v_now - make_interval(secs => v_window_seconds)
      then v_now
      else rate_limit.window_started_at
    end,
    request_count = case
      when rate_limit.window_started_at <=
        v_now - make_interval(secs => v_window_seconds)
      then 1
      else rate_limit.request_count + 1
    end
  returning rate_limit.window_started_at, rate_limit.request_count
    into v_window_started_at, v_request_count;

  allowed := v_request_count <= v_limit;
  retry_after_seconds := case
    when allowed then 0
    else greatest(
      1,
      ceil(extract(epoch from (
        v_window_started_at
          + make_interval(secs => v_window_seconds)
          - v_now
      )))::integer
    )
  end;
  return next;
end;
$$;

revoke all on function public.consume_rate_limit(text)
  from public, anon;
grant execute on function public.consume_rate_limit(text)
  to authenticated;

comment on column public.projects.bootcamp_report is
  'Latest source-grounded Bootcamp Mode report for this project.';
