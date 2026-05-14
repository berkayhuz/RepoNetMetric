import "server-only";

import { redirect } from "next/navigation";

import { CrmApiError } from "@/lib/crm-api";
import { buildAuthLoginRedirectUrl } from "@/lib/crm-auth/safe-return-url";

import type { CrmMutationState } from "./mutation-state";

function normalizeFieldKey(key: string): string {
  if (!key) {
    return key;
  }

  return key.charAt(0).toLowerCase() + key.slice(1);
}

function mapFieldErrors(error: CrmApiError): Record<string, string[]> | undefined {
  const source = error.problem?.errors;
  if (!source) {
    return undefined;
  }

  return Object.fromEntries(
    Object.entries(source).map(([key, values]) => [normalizeFieldKey(key), values]),
  );
}

export function mapCrmMutationErrorToState(error: unknown, returnPath: string): CrmMutationState {
  if (error instanceof CrmApiError) {
    if (error.kind === "unauthorized") {
      redirect(buildAuthLoginRedirectUrl(returnPath));
    }

    if (error.kind === "forbidden") {
      redirect("/access-denied");
    }

    if (error.kind === "rate_limited") {
      redirect("/retry-later");
    }

    if (error.kind === "server_error" || error.kind === "upstream_unavailable") {
      redirect("/service-unavailable");
    }

    if (error.kind === "validation") {
      const fieldErrors = mapFieldErrors(error);
      if (fieldErrors) {
        return {
          status: "error",
          message: error.problem?.detail ?? "Please review the highlighted fields.",
          fieldErrors,
        };
      }

      return {
        status: "error",
        message: error.problem?.detail ?? "Please review the highlighted fields.",
      };
    }

    if (error.kind === "conflict") {
      return {
        status: "error",
        message: error.problem?.detail ?? "This record changed elsewhere. Refresh and try again.",
      };
    }

    if (error.kind === "not_found") {
      return {
        status: "error",
        message: "The requested record no longer exists.",
      };
    }

    return {
      status: "error",
      message: "Unable to save changes right now.",
    };
  }

  return {
    status: "error",
    message: "Unexpected error while saving changes.",
  };
}
