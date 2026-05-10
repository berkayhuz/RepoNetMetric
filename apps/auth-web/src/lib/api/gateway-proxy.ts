import "server-only";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { serverEnv } from "@/lib/env/server-env";

type ProxyMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ProxyOptions = {
  endpoint: string;
  method: ProxyMethod;
};

function buildGatewayUrl(endpoint: string): string {
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  return `${serverEnv.NEXT_PUBLIC_API_BASE_URL}${normalizedEndpoint}`;
}

function getSetCookieHeaders(headers: Headers): string[] {
  const withGetSetCookie = headers as Headers & {
    getSetCookie?: () => string[];
  };

  const cookies = withGetSetCookie.getSetCookie?.();

  if (cookies && cookies.length > 0) {
    return cookies;
  }

  const singleCookie = headers.get("set-cookie");

  return singleCookie ? [singleCookie] : [];
}

function copyResponseHeaders(upstream: Response, response: NextResponse): void {
  const contentType = upstream.headers.get("content-type");
  const cacheControl = upstream.headers.get("cache-control");

  if (contentType) {
    response.headers.set("content-type", contentType);
  }

  if (cacheControl) {
    response.headers.set("cache-control", cacheControl);
  }

  for (const cookie of getSetCookieHeaders(upstream.headers)) {
    response.headers.append("set-cookie", cookie);
  }
}

export async function proxyToGateway(
  request: NextRequest,
  options: ProxyOptions,
): Promise<NextResponse> {
  const requestHeaders = new Headers();

  requestHeaders.set("accept", "application/json");

  const contentType = request.headers.get("content-type");

  if (contentType) {
    requestHeaders.set("content-type", contentType);
  }

  const cookie = request.headers.get("cookie");

  if (cookie) {
    requestHeaders.set("cookie", cookie);
  }

  const userAgent = request.headers.get("user-agent");

  if (userAgent) {
    requestHeaders.set("user-agent", userAgent);
  }

  const body =
    options.method === "GET" || options.method === "DELETE" ? undefined : await request.text();

  const requestInit: RequestInit = {
    method: options.method,
    headers: requestHeaders,
    cache: "no-store",
    redirect: "manual",
  };

  if (body && body.length > 0) {
    requestInit.body = body;
  }

  const upstream = await fetch(buildGatewayUrl(options.endpoint), requestInit);

  const responseBody = await upstream.text();

  const response = new NextResponse(responseBody || null, {
    status: upstream.status,
    statusText: upstream.statusText,
  });

  copyResponseHeaders(upstream, response);

  return response;
}
