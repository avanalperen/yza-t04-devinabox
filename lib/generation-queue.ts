import "server-only";

export const BLUEPRINT_GENERATION_TOPIC = "blueprint-generation";

export interface BlueprintGenerationMessage {
  jobId: string;
}

export function getGenerationQueueRegion(): string {
  return process.env.VERCEL_REGION?.trim() || "iad1";
}

export function shouldUseDurableGenerationQueue(): boolean {
  return (
    process.env.VERCEL === "1" ||
    process.env.BUILDPIXIES_USE_VERCEL_QUEUE === "1"
  );
}

export async function enqueueBlueprintGeneration(
  jobId: string,
): Promise<string | null> {
  const { QueueClient } = await import("@vercel/queue");
  const queue = new QueueClient({ region: getGenerationQueueRegion() });
  const result = await queue.send<BlueprintGenerationMessage>(
    BLUEPRINT_GENERATION_TOPIC,
    { jobId },
    {
      idempotencyKey: jobId,
      retentionSeconds: 86_400,
    },
  );
  return result.messageId;
}
