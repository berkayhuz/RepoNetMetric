"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@netmetric/ui";

import { AddressActionResult } from "@/components/address/address-action-result";
import {
  initialCrmMutationState,
  type CrmMutationState,
} from "@/features/shared/actions/mutation-state";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="destructive" disabled={pending} aria-busy={pending}>
      {pending ? "Deleting address..." : "Delete address"}
    </Button>
  );
}

export function AddressDeleteForm({
  action,
}: Readonly<{
  action: (state: CrmMutationState, formData: FormData) => Promise<CrmMutationState>;
}>) {
  const [state, formAction] = useActionState(action, initialCrmMutationState);

  return (
    <form action={formAction} className="space-y-3" noValidate>
      <input type="hidden" name="confirm" value="delete-address" />
      <AddressActionResult state={state} />
      <SubmitButton />
    </form>
  );
}
