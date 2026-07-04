export type OutputType =
  | "product_brief"
  | "mvp_scope"
  | "backlog"
  | "ux_flow"
  | "tech_plan"
  | "test_plan"
  | "sprint_plan"
  | "readme"
  | "pitch"
  | "code_skeleton";

export interface ProductBrief {
  projectName: string;
  oneLiner: string;
  problem: string;
  targetUsers: string[];
  mainValue: string;
  useCases: string[];
  successMetrics: string[];
}

export interface MvpScope {
  mustHave: { feature: string; why: string }[];
  niceToHave: { feature: string; whyLater: string }[];
  outOfScope: { feature: string; reason: string }[];
}

export interface BacklogItem {
  title: string;
  userStory: string;
  priority: "P0" | "P1" | "P2";
  sprint: number;
  acceptanceCriteria: string[];
}

export interface Backlog {
  items: BacklogItem[];
}

export interface UxFlowScreen {
  name: string;
  purpose: string;
  primaryAction: string;
  emptyState?: string;
  errorState?: string;
}

export interface UxFlow {
  journey: string;
  screens: UxFlowScreen[];
}

export interface TechPlan {
  recommendedStack: {
    frontend?: string;
    backend?: string;
    database?: string;
    ai?: string;
    deploy?: string;
  };
  architecture: string;
  databaseTables: string[];
  apiRoutes: string[];
  risks: string[];
}

export interface TestCase {
  name: string;
  type: "happy" | "edge" | "error";
  steps: string[];
  expectedResult: string;
}

export interface TestPlan {
  happyPath: TestCase[];
  edgeCases: TestCase[];
  errorMessages: string[];
  securityRisks: string[];
  demoChecklist: string[];
}

export interface SprintPlan {
  sprints: {
    name: string;
    goal: string;
    items: string[];
  }[];
}

export interface Blueprint {
  productBrief: ProductBrief;
  mvpScope: MvpScope;
  uxFlow: UxFlow;
  techPlan: TechPlan;
  backlog: Backlog;
  testPlan: TestPlan;
  sprintPlan: SprintPlan;
  readme: string;
}

export type BlueprintSection = keyof Blueprint;
