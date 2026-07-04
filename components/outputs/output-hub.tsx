"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Blueprint } from "@/types/output";
import type { Project } from "@/types/project";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-b py-3 last:border-0">
      <span className="text-xs font-medium uppercase text-muted-foreground">
        {label}
      </span>
      <div className="text-sm">{children}</div>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1">
      {items.map((i, idx) => (
        <li key={idx} className="text-sm text-muted-foreground">
          • {i}
        </li>
      ))}
    </ul>
  );
}

export function OutputHub({
  project,
  blueprint,
  onExport,
}: {
  project: Project;
  blueprint: Blueprint;
  onExport?: () => void;
}) {
  const b = blueprint;
  return (
    <Tabs defaultValue="product" className="w-full">
      <TabsList className="flex flex-wrap justify-start">
        <TabsTrigger value="product">Product</TabsTrigger>
        <TabsTrigger value="scope">Scope</TabsTrigger>
        <TabsTrigger value="ux">UX</TabsTrigger>
        <TabsTrigger value="tech">Tech</TabsTrigger>
        <TabsTrigger value="backlog">Backlog</TabsTrigger>
        <TabsTrigger value="tests">Tests</TabsTrigger>
        <TabsTrigger value="readme">README</TabsTrigger>
      </TabsList>

      <TabsContent value="product" className="rounded-xl border bg-card p-5">
        <Row label="Project name">{b.productBrief.projectName}</Row>
        <Row label="One liner">{b.productBrief.oneLiner}</Row>
        <Row label="Problem">{b.productBrief.problem}</Row>
        <Row label="Target users"><List items={b.productBrief.targetUsers} /></Row>
        <Row label="Value">{b.productBrief.mainValue}</Row>
        <Row label="Use cases"><List items={b.productBrief.useCases} /></Row>
        <Row label="Success metrics"><List items={b.productBrief.successMetrics} /></Row>
      </TabsContent>

      <TabsContent value="scope" className="rounded-xl border bg-card p-5">
        <Row label="Must have">
          <List items={b.mvpScope.mustHave.map((f) => `${f.feature} — ${f.why}`)} />
        </Row>
        <Row label="Nice to have">
          <List items={b.mvpScope.niceToHave.map((f) => `${f.feature} — ${f.whyLater}`)} />
        </Row>
        <Row label="Out of scope">
          <List items={b.mvpScope.outOfScope.map((f) => `${f.feature} — ${f.reason}`)} />
        </Row>
      </TabsContent>

      <TabsContent value="ux" className="rounded-xl border bg-card p-5">
        <Row label="Journey">{b.uxFlow.journey}</Row>
        <Row label="Screens">
          <div className="flex flex-col gap-2">
            {b.uxFlow.screens.map((s, i) => (
              <div key={i} className="rounded-lg border p-3">
                <p className="font-medium">{s.name}</p>
                <p className="text-sm text-muted-foreground">{s.purpose}</p>
                <Badge variant="secondary" className="mt-1">{s.primaryAction}</Badge>
              </div>
            ))}
          </div>
        </Row>
      </TabsContent>

      <TabsContent value="tech" className="rounded-xl border bg-card p-5">
        <Row label="Architecture">{b.techPlan.architecture}</Row>
        <Row label="Stack">
          <List
            items={Object.entries(b.techPlan.recommendedStack ?? {}).map(
              ([k, v]) => `${k}: ${v}`,
            )}
          />
        </Row>
        <Row label="Database tables"><List items={b.techPlan.databaseTables} /></Row>
        <Row label="API routes"><List items={b.techPlan.apiRoutes} /></Row>
        <Row label="Risks"><List items={b.techPlan.risks} /></Row>
      </TabsContent>

      <TabsContent value="backlog" className="rounded-xl border bg-card p-5">
        <div className="flex flex-col gap-2">
          {b.backlog.items.map((item, i) => (
            <div key={i} className="rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">{item.title}</p>
                <Badge variant="secondary">{item.priority}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{item.userStory}</p>
              <p className="text-xs text-muted-foreground">Sprint {item.sprint}</p>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="tests" className="rounded-xl border bg-card p-5">
        <Row label="Happy path">
          <List items={b.testPlan.happyPath.map((t) => t.name)} />
        </Row>
        <Row label="Edge cases">
          <List items={b.testPlan.edgeCases.map((t) => t.name)} />
        </Row>
        <Row label="Security risks"><List items={b.testPlan.securityRisks} /></Row>
        <Row label="Demo checklist">
          <List items={b.testPlan.demoChecklist} />
        </Row>
      </TabsContent>

      <TabsContent value="readme" className="rounded-xl border bg-card p-5">
        <div className="flex justify-end pb-3">
          <Button size="sm" variant="outline" onClick={onExport}>
            Download README.md
          </Button>
        </div>
        <pre className="overflow-auto whitespace-pre-wrap rounded-lg bg-muted p-4 text-xs">
          {b.readme || `# ${project.title}\n\nBlueprint generated by BuildPixies.`}
        </pre>
      </TabsContent>
    </Tabs>
  );
}
