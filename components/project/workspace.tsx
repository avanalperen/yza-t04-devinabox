"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PixieTeam } from "@/components/pixies/pixie-team";
import { OutputHub } from "@/components/outputs/output-hub";
import type { Project } from "@/types/project";
import type { Blueprint } from "@/types/output";
import type { PixieStatus } from "@/types/pixie";
import { PIXIES } from "@/types/pixie";

const pipelineNames = PIXIES.map((pixie) => pixie.name);

export function Workspace({ project }: { project: Project }) {
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Record<string, PixieStatus>>({});

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setBlueprint(null);
    const next: Record<string, PixieStatus> = {};
    PIXIES.forEach((p) => (next[p.name] = "waiting"));
    pipelineNames.forEach((n) => (next[n] = "thinking"));
    setStatuses(next);

    try {
      const res = await fetch("/api/generate-blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: project.id,
          input: {
            rawIdea: project.rawIdea,
            goal: project.goal,
            platform: project.platform,
            targetAudience: project.targetAudience,
            constraints: project.constraints,
            outputDepth: project.outputDepth,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setBlueprint(data.blueprint as Blueprint);
      const done: Record<string, PixieStatus> = {};
      PIXIES.forEach((p) => (done[p.name] = "done"));
      setStatuses(done);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
      const failed: Record<string, PixieStatus> = {};
      PIXIES.forEach((p) => (failed[p.name] = "failed"));
      setStatuses(failed);
    } finally {
      setLoading(false);
    }
  }

  async function handleExport() {
    if (!blueprint) return;
    const res = await fetch("/api/export-readme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId: project.id, blueprint }),
    });
    const data = await res.json();
    const blob = new Blob([data.markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = data.filename || "README.md";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="flex flex-col gap-4 rounded-2xl border bg-card p-5">
        <div>
          <h2 className="font-heading font-semibold">{project.title}</h2>
          <p className="text-sm text-muted-foreground">{project.rawIdea}</p>
        </div>
        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
          <span>Goal: {project.goal}</span>
          <span>Platform: {project.platform}</span>
          <span>Audience: {project.targetAudience}</span>
        </div>
        <Button onClick={handleGenerate} disabled={loading} className="pixie-glow">
          {loading ? "Pixies are working..." : blueprint ? "Regenerate" : "Generate blueprint"}
        </Button>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </aside>

      <div className="flex flex-col gap-6">
        <section>
          <h3 className="mb-3 font-heading text-sm font-medium text-muted-foreground">
            Pixie team
          </h3>
          <PixieTeam statuses={statuses} />
        </section>

        {blueprint && (
          <section>
            <h3 className="mb-3 font-heading text-sm font-medium text-muted-foreground">
              Blueprint
            </h3>
            <OutputHub project={project} blueprint={blueprint} onExport={handleExport} />
          </section>
        )}
      </div>
    </div>
  );
}
