"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button, Field, FieldContent, FieldError, FieldLabel, Input } from "@netmetric/ui";

import { createInvitationAction } from "../actions/invitation-actions";
import { initialMutationState } from "../actions/mutation-state";
import { InvitationActionResult } from "./invitation-action-result";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Creating..." : "Create invitation"}
    </Button>
  );
}

export function InvitationCreateForm() {
  const [state, formAction] = useActionState(createInvitationAction, initialMutationState);

  return (
    <form action={formAction} className="space-y-3" noValidate>
      <Field>
        <FieldLabel htmlFor="invite-email">Email</FieldLabel>
        <FieldContent>
          <Input
            id="invite-email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(state.fieldErrors?.email?.[0])}
            aria-describedby={state.fieldErrors?.email?.[0] ? "invite-email-error" : undefined}
          />
          <FieldError id="invite-email-error">{state.fieldErrors?.email?.[0]}</FieldError>
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="invite-firstName">First name (optional)</FieldLabel>
        <FieldContent>
          <Input id="invite-firstName" name="firstName" />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="invite-lastName">Last name (optional)</FieldLabel>
        <FieldContent>
          <Input id="invite-lastName" name="lastName" />
        </FieldContent>
      </Field>

      <SubmitButton />
      <InvitationActionResult
        state={state}
        successTitle="Invitation created"
        errorTitle="Create invitation failed"
      />
    </form>
  );
}
