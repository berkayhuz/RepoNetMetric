"use client";

import type { MutationState } from "../actions/mutation-state";
import { SecurityActionResult } from "./security-action-result";

type MemberRoleActionResultProps = {
  state: MutationState;
};

export function MemberRoleActionResult({ state }: MemberRoleActionResultProps) {
  return (
    <SecurityActionResult
      state={state}
      successTitle="Roles updated"
      errorTitle="Role update failed"
    />
  );
}
