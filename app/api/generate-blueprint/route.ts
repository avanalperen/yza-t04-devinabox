import { NextRequest } from "next/server";
import { generateBlueprint } from "@/lib/ai/orchestrator";
import { getProject, updateProjectStatus } from "@/lib/projects";
import type { CreateProjectInput } from "@/types/project";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    projectId?: string;
    input?: CreateProjectInput;
  };

  let input = body.input;
  if (!input && body.projectId) {
    const project = await getProject(body.projectId);
    if (!project) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }
    input = {
      rawIdea: project.rawIdea,
      goal: project.goal,
      platform: project.platform,
      targetAudience: project.targetAudience,
      constraints: project.constraints,
      outputDepth: project.outputDepth,
    };
  }

  if (!input || !input.rawIdea?.trim()) {
    return Response.json({ error: "rawIdea is required" }, { status: 400 });
  }

  if (body.projectId) {
    await updateProjectStatus(body.projectId, "generating");
  }

  try {
    const blueprint = await generateBlueprint(input);
    if (body.projectId) {
      await updateProjectStatus(body.projectId, "ready");
    }
    return Response.json({
      projectId: body.projectId,
      status: "ready",
      blueprint,
    });
  } catch (error) {
    if (body.projectId) {
      await updateProjectStatus(body.projectId, "failed");
    }
    return Response.json(
      { error: error instanceof Error ? error.message : "Generation failed" },
      { status: 500 },
    );
  }
}
