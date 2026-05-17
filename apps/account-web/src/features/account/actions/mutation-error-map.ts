import "server-only";

import { redirect } from "next/navigation";

import { AccountApiError } from "@/lib/account-api";
import { buildAuthLoginRedirectUrl } from "@/lib/auth/safe-return-url";
import { tAccount } from "@/lib/i18n/account-i18n";

import type { MutationState } from "./mutation-state";

function normalizeFieldKey(key: string): string {
  if (!key) {
    return key;
  }

  return key.charAt(0).toLowerCase() + key.slice(1);
}

function mapFieldErrors(error: AccountApiError): Record<string, string[]> | undefined {
  const source = error.problem?.errors;
  if (!source) {
    return undefined;
  }

  return Object.fromEntries(
    Object.entries(source).map(([key, values]) => [normalizeFieldKey(key), values]),
  );
}

export function mapMutationErrorToState(error: unknown, returnPath: string): MutationState {
  if (error instanceof AccountApiError) {
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

    if (error.kind === "validation" || error.status === 400 || error.status === 422) {
      const validationState: MutationState = {
        status: "error",
        message: error.problem?.detail ?? tAccount("account.errors.validation"),
      };
      const fieldErrors = mapFieldErrors(error);
      if (fieldErrors) {
        validationState.fieldErrors = fieldErrors;
      }
      return validationState;
    }

    if (error.kind === "conflict") {
      return {
        status: "error",
        code: "conflict",
        message: error.problem?.detail ?? tAccount("account.errors.conflict"),
      };
    }

    return {
      status: "error",
      message: tAccount("account.errors.saveFailed"),
    };
  }

  return {
    status: "error",
    message: tAccount("account.errors.unexpected"),
  };
}
