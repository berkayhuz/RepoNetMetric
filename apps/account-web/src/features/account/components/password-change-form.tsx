"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  FieldSet,
  Input,
} from "@netmetric/ui";

import { initialMutationState, type MutationState } from "../actions/mutation-state";
import { SecurityActionResult } from "./security-action-result";

type PasswordChangeFormProps = {
  action: (state: MutationState, formData: FormData) => Promise<MutationState>;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Changing..." : "Change password"}
    </Button>
  );
}

export function PasswordChangeForm({ action }: PasswordChangeFormProps) {
  const [state, formAction] = useActionState(action, initialMutationState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change password</CardTitle>
        <CardDescription>Your password update will secure this account session.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SecurityActionResult
          state={state}
          successTitle="Password changed"
          errorTitle="Password update failed"
        />
        <form action={formAction} className="space-y-4" noValidate>
          <FieldSet className="grid gap-4">
            <PasswordField
              id="currentPassword"
              name="currentPassword"
              label="Current password"
              error={state.fieldErrors?.currentPassword?.[0]}
            />
            <PasswordField
              id="newPassword"
              name="newPassword"
              label="New password"
              error={state.fieldErrors?.newPassword?.[0]}
            />
            <PasswordField
              id="confirmNewPassword"
              name="confirmNewPassword"
              label="Confirm new password"
              error={state.fieldErrors?.confirmNewPassword?.[0]}
            />
          </FieldSet>
          <div className="flex flex-wrap items-center gap-2">
            <SubmitButton />
            <Button type="reset" variant="outline">
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function PasswordField({
  id,
  name,
  label,
  error,
}: {
  id: string;
  name: string;
  label: string;
  error: string | undefined;
}) {
  const describedBy = error ? `${id}-error` : undefined;
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <FieldContent>
        <Input
          id={id}
          name={name}
          type="password"
          autoComplete={name === "currentPassword" ? "current-password" : "new-password"}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
        />
        <FieldError id={`${id}-error`}>{error}</FieldError>
      </FieldContent>
    </Field>
  );
}
