import "server-only";

import { z } from "zod";
import {
  AuthRequiredError,
  ServiceUnavailableError,
  StorageUnavailableError,
} from "@/lib/errors";

type ParseResult<T> =
  | { ok: true; data: T }
  | { ok: false; response: Response };

export function jsonError(
  message: string,
  status = 400,
  details?: unknown,
): Response {
  return Response.json(
    {
      error: message,
      ...(details ? { details } : {}),
    },
    { status },
  );
}

export async function parseJsonWithSchema<T extends z.ZodTypeAny>(
  request: Request,
  schema: T,
  options: { maxBytes?: number } = {},
): Promise<ParseResult<z.infer<T>>> {
  const maxBytes = options.maxBytes ?? 16_384;
  const mediaType = request.headers
    .get("content-type")
    ?.split(";", 1)[0]
    .trim()
    .toLowerCase();
  if (
    !mediaType ||
    (mediaType !== "application/json" && !mediaType.endsWith("+json"))
  ) {
    return {
      ok: false,
      response: jsonError("Content-Type must be application/json", 415),
    };
  }

  const contentLengthHeader = request.headers.get("content-length");
  const contentLength = contentLengthHeader
    ? Number(contentLengthHeader)
    : undefined;
  if (
    contentLength !== undefined &&
    (!Number.isSafeInteger(contentLength) || contentLength < 0)
  ) {
    return {
      ok: false,
      response: jsonError("Invalid Content-Length header", 400),
    };
  }
  if (contentLength !== undefined && contentLength > maxBytes) {
    return {
      ok: false,
      response: jsonError("Request body is too large", 413),
    };
  }

  let raw = "";
  try {
    raw = await request.text();
  } catch {
    return { ok: false, response: jsonError("Could not read request body", 400) };
  }

  if (new TextEncoder().encode(raw).byteLength > maxBytes) {
    return {
      ok: false,
      response: jsonError("Request body is too large", 413),
    };
  }

  let json: unknown;
  try {
    json = raw ? JSON.parse(raw) : {};
  } catch {
    return { ok: false, response: jsonError("Invalid JSON body", 400) };
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return {
      ok: false,
      response: jsonError(
        "Invalid request body",
        400,
        parsed.error.issues.map((issue) => ({
          path: issue.path.join(".") || "root",
          message: issue.message,
        })),
      ),
    };
  }

  return { ok: true, data: parsed.data };
}

export function getSafeErrorMessage(error: unknown): string {
  if (error instanceof z.ZodError) return "Invalid data";
  if (error instanceof AuthRequiredError) return error.message;
  if (error instanceof StorageUnavailableError) return error.message;
  if (error instanceof ServiceUnavailableError) return error.message;
  if (error instanceof Error && error.name === "AbortError") {
    return "Request timed out";
  }
  return "Something went wrong";
}
