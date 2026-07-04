"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ProjectGoal, ProjectPlatform } from "@/types/project";

const goals: { value: ProjectGoal; label: string }[] = [
  { value: "bootcamp", label: "Bootcamp project" },
  { value: "startup", label: "Startup MVP" },
  { value: "portfolio", label: "Portfolio project" },
  { value: "client", label: "Client project" },
  { value: "hackathon", label: "Hackathon" },
];

const platforms: { value: ProjectPlatform; label: string }[] = [
  { value: "web", label: "Web app" },
  { value: "mobile", label: "Mobile app" },
  { value: "extension", label: "Browser extension" },
  { value: "ai-tool", label: "AI tool" },
  { value: "marketplace", label: "Marketplace" },
  { value: "desktop", label: "Desktop app" },
];

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-md border bg-background px-3 text-sm"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function NewProjectForm() {
  const router = useRouter();
  const [rawIdea, setRawIdea] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [goal, setGoal] = useState<ProjectGoal>("bootcamp");
  const [platform, setPlatform] = useState<ProjectPlatform>("web");
  const [timeline, setTimeline] = useState("6 weeks");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rawIdea.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawIdea,
          targetAudience: targetAudience || "builders",
          goal,
          platform,
          constraints: { timeline },
        }),
      });
      const data = await res.json();
      if (data.project?.id) router.push(`/projects/${data.project.id}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="idea">What do you want to build?</Label>
        <Textarea
          id="idea"
          value={rawIdea}
          onChange={(e) => setRawIdea(e.target.value)}
          placeholder="e.g. An AI habit tracker for students that nudges them to stay consistent."
          rows={4}
          required
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="audience">Who is it for?</Label>
          <Input
            id="audience"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="students, solo founders, freelancers..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="timeline">Timeline</Label>
          <Input
            id="timeline"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            placeholder="6 weeks"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          label="Goal"
          value={goal}
          onChange={(v) => setGoal(v as ProjectGoal)}
          options={goals}
        />
        <Select
          label="Platform"
          value={platform}
          onChange={(v) => setPlatform(v as ProjectPlatform)}
          options={platforms}
        />
      </div>
      <Button type="submit" disabled={submitting || !rawIdea.trim()} className="pixie-glow">
        {submitting ? "Summoning pixies..." : "Summon your pixies"}
      </Button>
    </form>
  );
}
