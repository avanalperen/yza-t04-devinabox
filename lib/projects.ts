import type { Project, CreateProjectInput } from "@/types/project";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { createClient as createServerClient } from "@/lib/supabase/server";

const globalStore = globalThis as unknown as {
  __buildpixiesMemory?: Map<string, Project>;
};
const memory: Map<string, Project> =
  globalStore.__buildpixiesMemory ?? new Map<string, Project>();
globalStore.__buildpixiesMemory = memory;

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `proj_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function toProject(input: CreateProjectInput): Project {
  const now = new Date().toISOString();
  return {
    id: newId(),
    title: input.title?.trim() || input.rawIdea.slice(0, 60) || "Untitled idea",
    rawIdea: input.rawIdea,
    goal: input.goal,
    platform: input.platform,
    targetAudience: input.targetAudience,
    constraints: input.constraints ?? {},
    outputDepth: input.outputDepth,
    status: "draft",
    createdAt: now,
    updatedAt: now,
  };
}

export async function createProject(input: CreateProjectInput): Promise<Project> {
  const project = toProject(input);
  if (isSupabaseConfigured()) {
    const supabase = await createServerClient();
    if (supabase) {
      const { error } = await supabase.from("projects").insert({
        id: project.id,
        title: project.title,
        raw_idea: project.rawIdea,
        goal: project.goal,
        platform: project.platform,
        target_audience: project.targetAudience,
        constraints: project.constraints,
        status: project.status,
        created_at: project.createdAt,
        updated_at: project.updatedAt,
      });
      if (error) throw error;
      return project;
    }
  }
  memory.set(project.id, project);
  return project;
}

export async function listProjects(): Promise<Project[]> {
  if (isSupabaseConfigured()) {
    const supabase = await createServerClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map(rowToProject);
    }
  }
  return Array.from(memory.values()).sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt),
  );
}

export async function getProject(id: string): Promise<Project | null> {
  if (isSupabaseConfigured()) {
    const supabase = await createServerClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data ? rowToProject(data) : null;
    }
  }
  return memory.get(id) ?? null;
}

export async function updateProjectStatus(
  id: string,
  status: Project["status"],
): Promise<void> {
  const updatedAt = new Date().toISOString();
  if (isSupabaseConfigured()) {
    const supabase = await createServerClient();
    if (supabase) {
      const { error } = await supabase
        .from("projects")
        .update({ status, updated_at: updatedAt })
        .eq("id", id);
      if (error) throw error;
      return;
    }
  }
  const existing = memory.get(id);
  if (existing) memory.set(id, { ...existing, status, updatedAt });
}

function rowToProject(row: Record<string, unknown>): Project {
  return {
    id: String(row.id),
    title: String(row.title ?? ""),
    rawIdea: String(row.raw_idea ?? ""),
    goal: (row.goal as Project["goal"]) ?? "bootcamp",
    platform: (row.platform as Project["platform"]) ?? "web",
    targetAudience: String(row.target_audience ?? ""),
    constraints: (row.constraints as Project["constraints"]) ?? {},
    outputDepth: row.output_depth as Project["outputDepth"],
    status: (row.status as Project["status"]) ?? "draft",
    createdAt: String(row.created_at ?? new Date().toISOString()),
    updatedAt: String(row.updated_at ?? new Date().toISOString()),
  };
}
