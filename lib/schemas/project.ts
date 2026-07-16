import { z } from "zod";
import { blueprintSchema, bootcampReportSchema } from "@/lib/ai/schemas";
import type { Project } from "@/types/project";

export const projectGoalSchema = z.enum([
  "bootcamp",
  "startup",
  "portfolio",
  "client",
  "hackathon",
]);

export const projectPlatformSchema = z.enum([
  "web",
  "mobile",
  "extension",
  "ai-tool",
  "marketplace",
  "desktop",
]);

export const outputDepthSchema = z.enum([
  "quick",
  "detailed",
  "bootcamp-ready",
]);

export const projectConstraintsSchema = z
  .object({
    teamSize: z.number().int().min(1).max(20).optional(),
    timeline: z.string().trim().min(1).max(120).optional(),
    budget: z.string().trim().min(1).max(120).optional(),
    techPreference: z.string().trim().min(1).max(240).optional(),
  })
  .strict();

export const createProjectInputSchema = z
  .object({
    title: z.string().trim().min(1).max(120).optional(),
    rawIdea: z.string().trim().min(20).max(4_000),
    goal: projectGoalSchema.default("bootcamp"),
    platform: projectPlatformSchema.default("web"),
    targetAudience: z.string().trim().min(1).max(500).default("builders"),
    constraints: projectConstraintsSchema.optional(),
    outputDepth: outputDepthSchema.default("bootcamp-ready").optional(),
  })
  .strict();

export const projectSchema: z.ZodType<Project> = z
  .object({
    id: z.string().uuid(),
    ownerId: z.string().uuid().optional(),
    title: z.string().trim().min(1).max(120),
    rawIdea: z.string().trim().min(20).max(4_000),
    goal: projectGoalSchema,
    platform: projectPlatformSchema,
    targetAudience: z.string().trim().min(1).max(500),
    constraints: projectConstraintsSchema,
    outputDepth: outputDepthSchema.optional(),
    blueprint: blueprintSchema.optional(),
    bootcampReport: bootcampReportSchema.optional(),
    status: z.enum(["draft", "generating", "ready", "failed"]),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
  })
  .strict();
