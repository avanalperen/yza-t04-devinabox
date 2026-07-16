import { NextRequest } from "next/server";
import { getProject } from "@/lib/projects";
import { getSafeErrorMessage, jsonError } from "@/lib/api/http";
import { getErrorStatus } from "@/lib/errors";
import { resourceIdSchema } from "@/lib/api/schemas";

export async function GET(
  _request: NextRequest,
  context: RouteContext<"/api/projects/[id]">,
) {
  const { id } = await context.params;
  if (!resourceIdSchema.safeParse(id).success) {
    return jsonError("Invalid project id", 400);
  }
  try {
    const project = await getProject(id);
    if (!project) {
      return jsonError("Project not found", 404);
    }
    return Response.json({ project });
  } catch (error) {
    return jsonError(getSafeErrorMessage(error), getErrorStatus(error));
  }
}
