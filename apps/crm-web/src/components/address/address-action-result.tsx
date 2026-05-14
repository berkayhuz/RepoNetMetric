"use client";

import { Alert, AlertDescription, AlertTitle } from "@netmetric/ui";

import type { CrmMutationState } from "@/features/shared/actions/mutation-state";

export function AddressActionResult({ state }: Readonly<{ state: CrmMutationState }>) {
  if (state.status === "idle") {
    return null;
  }

  if (state.status === "success") {
    return (
      <Alert>
        <AlertTitle>Address Updated</AlertTitle>
        <AlertDescription>{state.message ?? "Address saved successfully."}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant="destructive">
      <AlertTitle>Address Action Failed</AlertTitle>
      <AlertDescription>{state.message ?? "Please try again."}</AlertDescription>
    </Alert>
  );
}
