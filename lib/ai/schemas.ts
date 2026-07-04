import { z } from "zod";
import type { BlueprintSection } from "@/types/output";

export const productBriefSchema = z.object({
  projectName: z.string(),
  oneLiner: z.string(),
  problem: z.string(),
  targetUsers: z.array(z.string()),
  mainValue: z.string(),
  useCases: z.array(z.string()),
  successMetrics: z.array(z.string()),
});

export const mvpScopeSchema = z.object({
  mustHave: z.array(z.object({ feature: z.string(), why: z.string() })),
  niceToHave: z.array(
    z.object({ feature: z.string(), whyLater: z.string() }),
  ),
  outOfScope: z.array(z.object({ feature: z.string(), reason: z.string() })),
});

export const backlogSchema = z.object({
  items: z.array(
    z.object({
      title: z.string(),
      userStory: z.string(),
      priority: z.enum(["P0", "P1", "P2"]),
      sprint: z.number(),
      acceptanceCriteria: z.array(z.string()),
    }),
  ),
});

export const uxFlowSchema = z.object({
  journey: z.string(),
  screens: z.array(
    z.object({
      name: z.string(),
      purpose: z.string(),
      primaryAction: z.string(),
      emptyState: z.string().optional(),
      errorState: z.string().optional(),
    }),
  ),
});

export const techPlanSchema = z.object({
  recommendedStack: z
    .object({
      frontend: z.string().optional(),
      backend: z.string().optional(),
      database: z.string().optional(),
      ai: z.string().optional(),
      deploy: z.string().optional(),
    })
    .optional(),
  architecture: z.string(),
  databaseTables: z.array(z.string()),
  apiRoutes: z.array(z.string()),
  risks: z.array(z.string()),
});

export const testPlanSchema = z.object({
  happyPath: z.array(
    z.object({
      name: z.string(),
      type: z.literal("happy"),
      steps: z.array(z.string()),
      expectedResult: z.string(),
    }),
  ),
  edgeCases: z.array(
    z.object({
      name: z.string(),
      type: z.literal("edge"),
      steps: z.array(z.string()),
      expectedResult: z.string(),
    }),
  ),
  errorMessages: z.array(z.string()),
  securityRisks: z.array(z.string()),
  demoChecklist: z.array(z.string()),
});

export const sprintPlanSchema = z.object({
  sprints: z.array(
    z.object({ name: z.string(), goal: z.string(), items: z.array(z.string()) }),
  ),
});

export const schemas: Record<
  Exclude<BlueprintSection, "readme">,
  z.ZodTypeAny
> = {
  productBrief: productBriefSchema,
  mvpScope: mvpScopeSchema,
  backlog: backlogSchema,
  uxFlow: uxFlowSchema,
  techPlan: techPlanSchema,
  testPlan: testPlanSchema,
  sprintPlan: sprintPlanSchema,
};

export function validateSection(
  section: Exclude<BlueprintSection, "readme">,
  data: unknown,
) {
  return schemas[section].safeParse(data);
}
