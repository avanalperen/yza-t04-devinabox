import { z } from "zod";
import { blueprintSchema } from "@/lib/ai/schemas";
import { createProjectInputSchema } from "@/lib/schemas/project";

export { createProjectInputSchema } from "@/lib/schemas/project";

export const resourceIdSchema = z.string().uuid();

export const createProjectRequestSchema = createProjectInputSchema;

export const blueprintSectionSchema = z.enum([
  "orchestrationPlan",
  "productBrief",
  "marketAnalysis",
  "mvpScope",
  "uxFlow",
  "techPlan",
  "codeSkeleton",
  "backlog",
  "testPlan",
  "sprintPlan",
  "readme",
]);

export const generateBlueprintRequestSchema = z
  .object({
    projectId: resourceIdSchema.optional(),
    input: createProjectInputSchema.optional(),
  })
  .strict()
  .refine((value) => value.projectId || value.input, {
    message: "projectId or input is required",
  });

export const regenerateOutputRequestSchema = z
  .object({
    projectId: resourceIdSchema.optional(),
    input: createProjectInputSchema.optional(),
    section: blueprintSectionSchema,
    previousOutputs: blueprintSchema.optional(),
  })
  .strict()
  .refine((value) => value.projectId || value.input, {
    message: "projectId or input is required",
  });

export const bootcampReportRequestSchema = z
  .object({
    projectId: resourceIdSchema,
    sprintName: z.string().trim().min(1).max(120).default("Current Sprint"),
    sprintGoal: z.string().trim().min(1).max(500).optional(),
    progressNotes: z.string().trim().min(20).max(8_000),
  })
  .strict();

export const exportReadmeRequestSchema = z
  .object({
    projectId: resourceIdSchema.optional(),
    blueprint: blueprintSchema,
  })
  .strict();

export const exportJsonRequestSchema = z
  .object({
    projectId: resourceIdSchema.optional(),
    blueprint: blueprintSchema,
  })
  .strict();
