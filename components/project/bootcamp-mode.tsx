"use client";

import { useState, type FormEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { requestJson } from "@/lib/api/client";
import { bootcampReportSchema } from "@/lib/ai/schemas";
import { exportBootcampMarkdown } from "@/lib/export/bootcamp";
import type { BootcampReport } from "@/types/output";
import type { Project } from "@/types/project";

function EvidenceList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return (
      <p className="text-sm italic text-muted-foreground">
        Not provided in the source notes.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((item, index) => (
        <li
          key={`${index}-${item}`}
          className="break-words text-sm text-muted-foreground"
        >
          • {item}
        </li>
      ))}
    </ul>
  );
}

function ReportSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b py-3 first:pt-0 last:border-0 last:pb-0">
      <h5 className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </h5>
      {children}
    </div>
  );
}

function generatedLabel(generatedAt: string): string {
  return `${generatedAt.slice(0, 10)} ${generatedAt.slice(11, 16)} UTC`;
}

function safeFilename(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "sprint";
}

export function BootcampMode({ project }: { project: Project }) {
  const initialReport = project.bootcampReport;
  const [sprintName, setSprintName] = useState(
    initialReport?.sprintName ?? "Current Sprint",
  );
  const [sprintGoal, setSprintGoal] = useState(
    initialReport?.sprintGoal ?? "",
  );
  const [progressNotes, setProgressNotes] = useState(
    initialReport?.sourceNotes ?? "",
  );
  const [report, setReport] = useState<BootcampReport | null>(
    initialReport ?? null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading || progressNotes.trim().length < 20) return;

    setLoading(true);
    setError(null);
    setCopied(false);
    try {
      const data = await requestJson<{ report?: unknown }>(
        "/api/bootcamp-report",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectId: project.id,
            sprintName,
            sprintGoal: sprintGoal.trim() || undefined,
            progressNotes,
          }),
        },
        "Bootcamp report could not be generated",
      );
      setReport(bootcampReportSchema.parse(data.report));
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Bootcamp report could not be generated",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!report) return;
    setError(null);
    try {
      await navigator.clipboard.writeText(exportBootcampMarkdown(report));
      setCopied(true);
    } catch {
      setError("Copy failed. Your browser may not allow clipboard access.");
    }
  }

  function handleDownload() {
    if (!report) return;
    const blob = new Blob([exportBootcampMarkdown(report)], {
      type: "text/markdown",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${safeFilename(report.sprintName)}-report.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section aria-labelledby="bootcamp-mode-title">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <h3
          id="bootcamp-mode-title"
          className="font-heading text-sm font-medium text-muted-foreground"
        >
          Bootcamp Mode
        </h3>
        <Badge variant="secondary">Source-grounded</Badge>
      </div>

      <Card className="border-primary/20">
        <CardHeader className="border-b">
          <CardTitle>Turn real progress into Scrum documents</CardTitle>
          <CardDescription>
            Sprinta organizes only the facts in your notes. Missing work is
            flagged instead of being invented.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <form onSubmit={handleSubmit} className="flex min-w-0 flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="bootcamp-sprint-name">Sprint name</Label>
                <Input
                  id="bootcamp-sprint-name"
                  value={sprintName}
                  onChange={(event) => setSprintName(event.target.value)}
                  maxLength={120}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="bootcamp-sprint-goal">Sprint goal</Label>
                <Input
                  id="bootcamp-sprint-goal"
                  value={sprintGoal}
                  onChange={(event) => setSprintGoal(event.target.value)}
                  maxLength={500}
                  placeholder="Optional but recommended"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="bootcamp-progress-notes">Progress notes</Label>
                <span className="text-xs text-muted-foreground">
                  {progressNotes.length}/8000
                </span>
              </div>
              <Textarea
                id="bootcamp-progress-notes"
                value={progressNotes}
                onChange={(event) => setProgressNotes(event.target.value)}
                minLength={20}
                maxLength={8_000}
                rows={10}
                required
                className="min-h-56 resize-y"
                placeholder={
                  "Today I completed the project form.\nBlocked by deployment environment setup.\nNext I will run the live smoke test."
                }
                aria-describedby="bootcamp-notes-help"
              />
              <p id="bootcamp-notes-help" className="text-xs text-muted-foreground">
                Include completed work, current work, blockers, evidence and next steps.
              </p>
            </div>
            <Button
              type="submit"
              disabled={loading || progressNotes.trim().length < 20}
              className="self-start pixie-glow"
            >
              {loading
                ? "Sprinta is organizing..."
                : report
                  ? "Regenerate report"
                  : "Generate report"}
            </Button>
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
          </form>

          <div className="min-w-0" aria-live="polite">
            {report ? (
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs text-muted-foreground">
                    Saved {generatedLabel(report.generatedAt)}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={handleCopy}
                    >
                      {copied ? "Copied" : "Copy Markdown"}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={handleDownload}
                    >
                      Download .md
                    </Button>
                  </div>
                </div>
                <Tabs defaultValue="daily" className="w-full">
                  <TabsList className="w-full justify-start overflow-x-auto">
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="review">Review</TabsTrigger>
                    <TabsTrigger value="retro">Retro</TabsTrigger>
                    <TabsTrigger value="status">Status</TabsTrigger>
                    <TabsTrigger value="backlog">Backlog</TabsTrigger>
                    <TabsTrigger value="readme">README</TabsTrigger>
                  </TabsList>

                  <TabsContent value="daily" className="rounded-xl border p-4">
                    <ReportSection label="Completed">
                      <EvidenceList items={report.dailyScrum.completed} />
                    </ReportSection>
                    <ReportSection label="In progress">
                      <EvidenceList items={report.dailyScrum.inProgress} />
                    </ReportSection>
                    <ReportSection label="Blockers">
                      <EvidenceList items={report.dailyScrum.blockers} />
                    </ReportSection>
                    <ReportSection label="Next">
                      <EvidenceList items={report.dailyScrum.next} />
                    </ReportSection>
                  </TabsContent>

                  <TabsContent value="review" className="rounded-xl border p-4">
                    <ReportSection label="Summary">
                      <p className="break-words text-sm">
                        {report.sprintReview.summary}
                      </p>
                    </ReportSection>
                    <ReportSection label="Completed">
                      <EvidenceList items={report.sprintReview.completed} />
                    </ReportSection>
                    <ReportSection label="Evidence">
                      <EvidenceList items={report.sprintReview.evidence} />
                    </ReportSection>
                    <ReportSection label="Not completed or unverified">
                      <EvidenceList items={report.sprintReview.notCompleted} />
                    </ReportSection>
                  </TabsContent>

                  <TabsContent value="retro" className="rounded-xl border p-4">
                    <ReportSection label="What went well">
                      <EvidenceList items={report.sprintRetrospective.wentWell} />
                    </ReportSection>
                    <ReportSection label="Challenges">
                      <EvidenceList items={report.sprintRetrospective.challenges} />
                    </ReportSection>
                    <ReportSection label="Actions">
                      <EvidenceList items={report.sprintRetrospective.actions} />
                    </ReportSection>
                  </TabsContent>

                  <TabsContent value="status" className="rounded-xl border p-4">
                    <ReportSection label="Product status">
                      <p className="break-words text-sm">{report.productStatus}</p>
                    </ReportSection>
                    <ReportSection label="Missing information">
                      <EvidenceList items={report.missingInformation} />
                    </ReportSection>
                  </TabsContent>

                  <TabsContent value="backlog" className="rounded-xl border p-4">
                    <ReportSection label="Distribution rationale">
                      <p className="break-words text-sm">
                        {report.backlogUpdate.explanation}
                      </p>
                    </ReportSection>
                    <ReportSection label="Done">
                      <EvidenceList items={report.backlogUpdate.done} />
                    </ReportSection>
                    <ReportSection label="In progress">
                      <EvidenceList items={report.backlogUpdate.inProgress} />
                    </ReportSection>
                    <ReportSection label="Carried over">
                      <EvidenceList items={report.backlogUpdate.carriedOver} />
                    </ReportSection>
                  </TabsContent>

                  <TabsContent value="readme" className="rounded-xl border p-4">
                    <pre className="max-h-96 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-muted p-4 text-xs">
                      {report.readmeSprintSection}
                    </pre>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="flex min-h-56 flex-col justify-center rounded-xl border border-dashed bg-muted/30 p-6">
                <h4 className="font-heading font-medium">No sprint report yet</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Add factual progress notes to create Daily Scrum, Review,
                  Retrospective, product status, backlog and README drafts.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
