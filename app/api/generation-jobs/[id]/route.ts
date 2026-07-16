import { NextRequest } from "next/server";
import { getGenerationJob } from "@/lib/generation-jobs";
import { getSafeErrorMessage, jsonError } from "@/lib/api/http";
import { getErrorStatus } from "@/lib/errors";
import { resourceIdSchema } from "@/lib/api/schemas";

export async function GET(
  _request: NextRequest,
  context: RouteContext<"/api/generation-jobs/[id]">,
) {
  const { id } = await context.params;
  if (!resourceIdSchema.safeParse(id).success) {
    return jsonError("Invalid generation job id", 400);
  }

  try {
    const job = await getGenerationJob(id);
    if (!job) {
      return jsonError("Generation job not found", 404);
    }
    return Response.json({ job });
  } catch (error) {
    return jsonError(getSafeErrorMessage(error), getErrorStatus(error));
  }
}
