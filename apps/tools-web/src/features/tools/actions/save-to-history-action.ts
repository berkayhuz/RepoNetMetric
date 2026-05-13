"use server";

import { revalidatePath } from "next/cache";

import { assertSameOriginRequest } from "@/lib/security/csrf";
import { buildAuthLoginRedirectUrl } from "@/lib/tools-auth/safe-return-url";
import { getToolsApiRequestOptions } from "@/lib/tools-api/tools-api-request-options";
import { toolsApiClient, ToolsApiError } from "@/lib/tools-api";

import {
  ensureSaveFileConstraints,
  getFallbackExtension,
  normalizeArtifactFileName,
} from "./tool-history-rules";
import {
  initialToolHistoryActionState,
  type ToolHistoryActionState,
} from "./tool-history-action-state";

function readTrimmedString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function mapSaveError(error: unknown): ToolHistoryActionState {
  if (error instanceof ToolsApiError) {
    if (error.kind === "unauthorized") {
      return {
        status: "error",
        message: `Sign in required to save history. Continue at: ${buildAuthLoginRedirectUrl("/history")}`,
      };
    }

    if (error.kind === "forbidden") {
      return { status: "error", message: "You are not permitted to save this tool output." };
    }

    if (error.kind === "payload_too_large") {
      return { status: "error", message: "Output file is too large to save. Maximum is 10 MB." };
    }

    if (error.kind === "unsupported_media_type") {
      return { status: "error", message: "Output format is not supported for save." };
    }

    if (error.kind === "validation") {
      return {
        status: "error",
        message: error.problem?.detail ?? "Please verify tool output details and try again.",
      };
    }

    if (error.kind === "rate_limited") {
      return { status: "error", message: "Too many requests. Please try again shortly." };
    }

    if (error.kind === "server_error" || error.kind === "upstream_unavailable") {
      return { status: "error", message: "History service is temporarily unavailable." };
    }

    return { status: "error", message: "Could not save history right now." };
  }

  return { status: "error", message: "Unexpected error while saving history." };
}

export async function saveToHistoryAction(
  _previous: ToolHistoryActionState,
  formData: FormData,
): Promise<ToolHistoryActionState> {
  await assertSameOriginRequest();

  const toolSlug = readTrimmedString(formData, "toolSlug");
  const inputSummaryJson = readTrimmedString(formData, "inputSummaryJson") || "{}";
  const outputFile = formData.get("outputFile");

  if (!(outputFile instanceof File)) {
    return { status: "error", message: "Generated output file is required before saving." };
  }

  const constraints = ensureSaveFileConstraints({
    toolSlug,
    mimeType: outputFile.type,
    fileSize: outputFile.size,
  });

  if (!constraints.ok) {
    return { status: "error", message: constraints.message };
  }

  const safeFileName = normalizeArtifactFileName(
    outputFile.name,
    getFallbackExtension(outputFile.type),
  );

  const requestFormData = new FormData();
  requestFormData.set("toolSlug", toolSlug);
  requestFormData.set("inputSummaryJson", inputSummaryJson);
  requestFormData.set("artifact", outputFile, safeFileName);

  try {
    const requestOptions = await getToolsApiRequestOptions();
    const response = await toolsApiClient.createHistory(requestFormData, requestOptions);

    revalidatePath("/history");
    revalidatePath(`/history/${response.runId}`);

    return {
      status: "success",
      message: "Saved to history.",
      runId: response.runId,
    };
  } catch (error) {
    return mapSaveError(error);
  }
}

export { initialToolHistoryActionState };
