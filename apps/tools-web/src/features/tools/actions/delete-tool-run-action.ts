"use server";

import { revalidatePath } from "next/cache";

import { assertSameOriginRequest } from "@/lib/security/csrf";
import { buildAuthLoginRedirectUrl } from "@/lib/tools-auth/safe-return-url";
import { getToolsApiRequestOptions } from "@/lib/tools-api/tools-api-request-options";
import { toolsApiClient, ToolsApiError } from "@/lib/tools-api";

import {
  initialToolHistoryActionState,
  type ToolHistoryActionState,
} from "./tool-history-action-state";

function readTrimmedString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function mapDeleteError(error: unknown): ToolHistoryActionState {
  if (error instanceof ToolsApiError) {
    if (error.kind === "unauthorized") {
      return {
        status: "error",
        message: `Sign in required. Continue at: ${buildAuthLoginRedirectUrl("/history")}`,
      };
    }

    if (error.kind === "forbidden") {
      return { status: "error", message: "You are not permitted to delete this run." };
    }

    if (error.kind === "not_found") {
      return { status: "error", message: "Run was not found or was already deleted." };
    }

    if (error.kind === "rate_limited") {
      return { status: "error", message: "Too many requests. Please retry shortly." };
    }

    if (error.kind === "server_error" || error.kind === "upstream_unavailable") {
      return { status: "error", message: "History service is temporarily unavailable." };
    }
  }

  return { status: "error", message: "Unexpected error while deleting the run." };
}

export async function deleteToolRunAction(
  _previous: ToolHistoryActionState,
  formData: FormData,
): Promise<ToolHistoryActionState> {
  await assertSameOriginRequest();

  const runId = readTrimmedString(formData, "runId");
  const confirm = readTrimmedString(formData, "confirm");

  if (!runId) {
    return { status: "error", message: "Run id is required." };
  }

  if (confirm !== "delete-tool-run") {
    return {
      status: "error",
      message: "Please type the confirmation marker before deleting this run.",
    };
  }

  try {
    const requestOptions = await getToolsApiRequestOptions();
    await toolsApiClient.deleteHistory(runId, requestOptions);

    revalidatePath("/history");
    revalidatePath(`/history/${runId}`);

    return {
      status: "success",
      message: "Run deleted successfully.",
    };
  } catch (error) {
    return mapDeleteError(error);
  }
}

export { initialToolHistoryActionState };
