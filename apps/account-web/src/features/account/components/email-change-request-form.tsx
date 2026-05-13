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
  Text,
} from "@netmetric/ui";

import { initialMutationState, type MutationState } from "../actions/mutation-state";
import { SecurityActionResult } from "./security-action-result";

type EmailChangeRequestFormProps = {
  action: (state: MutationState, formData: FormData) => Promise<MutationState>;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Requesting..." : "Request email change"}
    </Button>
  );
}

export function EmailChangeRequestForm({ action }: EmailChangeRequestFormProps) {
  const [state, formAction] = useActionState(action, initialMutationState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change email</CardTitle>
        <CardDescription>Request an email change with password confirmation.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Text className="text-sm text-muted-foreground">
          If confirmation is required, follow the verification link sent to the new email address.
        </Text>
        <SecurityActionResult
          state={state}
          successTitle="Email change requested"
          errorTitle="Email change request failed"
        />
        <form action={formAction} className="space-y-4" noValidate>
          <FieldSet className="grid gap-4">
            <Field>
              <FieldLabel htmlFor="newEmail">New email address</FieldLabel>
              <FieldContent>
                <Input
                  id="newEmail"
                  name="newEmail"
                  type="email"
                  autoComplete="email"
                  aria-invalid={Boolean(state.fieldErrors?.newEmail?.[0])}
                  aria-describedby={state.fieldErrors?.newEmail?.[0] ? "newEmail-error" : undefined}
                />
                <FieldError id="newEmail-error">{state.fieldErrors?.newEmail?.[0]}</FieldError>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="currentPasswordForEmail">Current password</FieldLabel>
              <FieldContent>
                <Input
                  id="currentPasswordForEmail"
                  name="currentPassword"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={Boolean(state.fieldErrors?.currentPassword?.[0])}
                  aria-describedby={
                    state.fieldErrors?.currentPassword?.[0]
                      ? "currentPasswordForEmail-error"
                      : undefined
                  }
                />
                <FieldError id="currentPasswordForEmail-error">
                  {state.fieldErrors?.currentPassword?.[0]}
                </FieldError>
              </FieldContent>
            </Field>
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
