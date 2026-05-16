"use client";

import { Alert, AlertDescription, AlertTitle } from "@netmetric/ui";
import { tCrmClient } from "@/lib/i18n/crm-i18n";

import type { CrmMutationState } from "@/features/shared/actions/mutation-state";

export function AddressActionResult({ state }: Readonly<{ state: CrmMutationState }>) {
  if (state.status === "idle") {
    return null;
  }

  if (state.status === "success") {
    return (
      <Alert>
        <AlertTitle>{tCrmClient("crm.address.result.savedTitle")}</AlertTitle>
        <AlertDescription>
          {state.message ?? tCrmClient("crm.address.result.savedDescription")}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant="destructive">
      <AlertTitle>{tCrmClient("crm.address.result.errorTitle")}</AlertTitle>
      <AlertDescription>
        {state.message ?? tCrmClient("crm.forms.result.tryAgain")}
      </AlertDescription>
    </Alert>
  );
}
