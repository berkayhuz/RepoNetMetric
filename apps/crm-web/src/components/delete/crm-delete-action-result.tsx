"use client";

import { Alert, AlertDescription, AlertTitle } from "@netmetric/ui";

import type { CrmMutationState } from "@/features/shared/actions/mutation-state";

export function CrmDeleteActionResult({ state }: Readonly<{ state: CrmMutationState }>) {
  if (state.status !== "error") {
    return null;
  }

  return (
    <Alert variant="destructive" role="alert" aria-live="assertive">
      <AlertTitle>Delete failed</AlertTitle>
      <AlertDescription>{state.message ?? "Unable to delete record."}</AlertDescription>
    </Alert>
  );
}
