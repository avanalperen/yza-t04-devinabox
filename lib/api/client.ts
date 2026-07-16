type ErrorPayload = {
  error?: unknown;
};

export class ApiRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

function errorMessage(payload: unknown, fallback: string): string {
  if (
    payload &&
    typeof payload === "object" &&
    "error" in payload &&
    typeof (payload as ErrorPayload).error === "string"
  ) {
    return (payload as { error: string }).error;
  }
  return fallback;
}

export async function requestJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
  fallbackMessage = "Request failed",
): Promise<T> {
  const response = await fetch(input, init);
  const raw = await response.text();
  let payload: unknown = null;

  if (raw) {
    try {
      payload = JSON.parse(raw);
    } catch {
      throw new ApiRequestError(
        response.ok ? "Server returned an invalid response" : fallbackMessage,
        response.status,
      );
    }
  }

  if (!response.ok) {
    throw new ApiRequestError(
      errorMessage(payload, fallbackMessage),
      response.status,
    );
  }
  if (!payload || typeof payload !== "object") {
    throw new ApiRequestError("Server returned an empty response", response.status);
  }

  return payload as T;
}
