import { NextRequest } from "next/server";
import { createProject, listProjects } from "@/lib/projects";
import type { CreateProjectInput } from "@/types/project";

export async function GET() {
  const projects = await listProjects();
  return Response.json({ projects });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<CreateProjectInput>;
  if (!body.rawIdea || !body.rawIdea.trim()) {
    return Response.json(
      { error: "rawIdea is required" },
      { status: 400 },
    );
  }
  const input: CreateProjectInput = {
    rawIdea: body.rawIdea,
    goal: body.goal ?? "bootcamp",
    platform: body.platform ?? "web",
    targetAudience: body.targetAudience ?? "builders",
    constraints: body.constraints,
    outputDepth: body.outputDepth,
    title: body.title,
  };
  const project = await createProject(input);
  return Response.json({ project }, { status: 201 });
}
