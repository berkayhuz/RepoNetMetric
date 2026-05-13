"use client";

import { SecurityActionResult } from "./security-action-result";
import type { MutationState } from "../actions/mutation-state";

type ConsentActionResultProps = {
  state: MutationState;
};

export function ConsentActionResult({ state }: ConsentActionResultProps) {
  return (
    <SecurityActionResult
      state={state}
      successTitle="Consent accepted"
      errorTitle="Consent acceptance failed"
    />
  );
}
