"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CircleAlert, RotateCcw } from "lucide-react";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("Route rendering failed", { digest: error.digest });
  }, [error.digest]);

  return (
    <main className="magical-canvas flex min-h-screen items-center justify-center p-6">
      <section
        role="alert"
        className="app-card flex w-full max-w-lg flex-col items-center p-8 text-center md:p-12"
      >
        <span className="mb-5 flex size-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <CircleAlert className="size-7" aria-hidden="true" />
        </span>
        <h1 className="font-heading text-3xl font-semibold">The pixies hit a snag</h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          Your data was not changed. Try loading this screen again or return to your projects.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={unstable_retry}
            className="magic-button inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Try again
          </button>
          <Link
            href="/dashboard"
            className="inline-flex h-11 items-center rounded-xl border border-outline-variant px-5 text-sm font-semibold text-muted-foreground hover:text-primary"
          >
            Return to projects
          </Link>
        </div>
      </section>
    </main>
  );
}
