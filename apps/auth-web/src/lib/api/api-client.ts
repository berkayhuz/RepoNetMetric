import { serverEnv } from "@/lib/env/server-env";

import { ApiError } from "./api-error";
import { isProblemDetails } from "./problem-details";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ApiClientOptions = {
  method?: HttpMethod;
  body?: unknown;
  headers?: HeadersInit;
  cache?: RequestCache;
  credentials?: RequestCredentials;
};

function buildUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const gatewayBaseUrl =
    serverEnv.NEXT_PUBLIC_API_GATEWAY_BASE_URL ?? serverEnv.NEXT_PUBLIC_API_BASE_URL;
  return `${gatewayBaseUrl}${normalizedPath}`;
}

async function readJson(response: Response): Promise<unknown> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

export async function apiRequest<TResponse>(
  path: string,
  options: ApiClientOptions = {},
): Promise<TResponse> {
  const requestInit: RequestInit = {
    method: options.method ?? "GET",
    cache: options.cache ?? "no-store",
    credentials: options.credentials ?? "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  if (options.body !== undefined) {
    requestInit.body = JSON.stringify(options.body);
  }

  const response = await fetch(buildUrl(path), requestInit);

  const payload = await readJson(response);

  if (!response.ok) {
    if (isProblemDetails(payload)) {
      throw new ApiError(
        payload.detail ?? payload.title ?? "Operation could not be completed.",
        response.status,
        payload,
      );
    }

    throw new ApiError("Operation could not be completed.", response.status);
  }

  return payload as TResponse;
}
