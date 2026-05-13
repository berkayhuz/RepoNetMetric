import { NextResponse } from "next/server";

import { getToolsApiRequestOptions } from "@/lib/tools-api/tools-api-request-options";
import { toolsApiClient, ToolsApiError } from "@/lib/tools-api";

function sanitizeContentDisposition(value: string | null): string | null {
  if (!value) {
    return null;
  }

  return value.replace(/[\r\n]/g, "");
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id } = await context.params;

  try {
    const options = await getToolsApiRequestOptions();
    const download = await toolsApiClient.downloadHistory(id, options);

    const headers = new Headers();
    headers.set("content-type", download.contentType);

    const safeDisposition = sanitizeContentDisposition(download.contentDisposition);
    if (safeDisposition) {
      headers.set("content-disposition", safeDisposition);
    }

    return new Response(download.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    if (error instanceof ToolsApiError) {
      if (error.kind === "unauthorized") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      if (error.kind === "forbidden") {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      }

      if (error.kind === "not_found") {
        return NextResponse.json({ message: "Not found" }, { status: 404 });
      }

      if (error.kind === "rate_limited") {
        return NextResponse.json({ message: "Rate limited" }, { status: 429 });
      }

      return NextResponse.json({ message: "Service unavailable" }, { status: 503 });
    }

    return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
  }
}
