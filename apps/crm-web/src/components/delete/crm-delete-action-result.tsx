"use client";

import { Alert, AlertDescription, AlertTitle } from "@netmetric/ui";
import { tCrmClient } from "@/lib/i18n/crm-i18n";

import type { CrmMutationState } from "@/features/shared/actions/mutation-state";

export function CrmDeleteActionResult({ state }: Readonly<{ state: CrmMutationState }>) {
  if (state.status !== "error") {
    return null;
  }

  return (
    <Alert variant="destructive" role="alert" aria-live="assertive">
      <AlertTitle>{tCrmClient("crm.delete.failedTitle")}</AlertTitle>
      <AlertDescription>
        {state.message ?? tCrmClient("crm.delete.failedDescription")}
      </AlertDescription>
    </Alert>
  );
}
