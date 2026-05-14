"use client";

import { Alert, AlertDescription, AlertTitle } from "@netmetric/ui";

import type { CrmMutationState } from "@/features/shared/actions/mutation-state";

export function CrmMutationResult({ state }: Readonly<{ state: CrmMutationState }>) {
  if (state.status === "idle") {
    return null;
  }

  if (state.status === "success") {
    return (
      <Alert>
        <AlertTitle>Saved</AlertTitle>
        <AlertDescription>{state.message ?? "Changes saved successfully."}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant="destructive">
      <AlertTitle>Unable to Save</AlertTitle>
      <AlertDescription>{state.message ?? "Please try again."}</AlertDescription>
    </Alert>
  );
}
