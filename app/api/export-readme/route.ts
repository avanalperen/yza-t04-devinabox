import { NextRequest } from "next/server";
import { exportMarkdown } from "@/lib/export/markdown";
import { getProject } from "@/lib/projects";
import type { Blueprint } from "@/types/output";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    projectId?: string;
    blueprint?: Blueprint;
  };

  let project = body.projectId ? await getProject(body.projectId) : null;
  if (!project) {
    project = {
      id: "export",
      title: "Untitled idea",
      rawIdea: "",
      goal: "bootcamp",
      platform: "web",
      targetAudience: "",
      constraints: {},
      status: "ready",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  if (!body.blueprint) {
    return Response.json({ error: "blueprint is required" }, { status: 400 });
  }

  const markdown = exportMarkdown(project, body.blueprint);
  return Response.json({ markdown, filename: "README.md" });
}
