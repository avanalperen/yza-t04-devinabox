import { NextRequest } from "next/server";
import { regenerateSection } from "@/lib/ai/orchestrator";
import type { BlueprintSection } from "@/types/output";
import type { CreateProjectInput } from "@/types/project";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    input: CreateProjectInput;
    section: BlueprintSection;
    previousOutputs?: Record<string, unknown>;
  };

  if (!body.input || !body.section) {
    return Response.json(
      { error: "input and section are required" },
      { status: 400 },
    );
  }

  try {
    const output = await regenerateSection(
      body.input,
      body.section,
      body.previousOutputs,
    );
    return Response.json({ section: body.section, output });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Regeneration failed" },
      { status: 500 },
    );
  }
}
