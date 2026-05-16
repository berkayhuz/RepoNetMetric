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
import { tAccountClient } from "@/lib/i18n/account-i18n";

type EmailChangeRequestFormProps = {
  action: (state: MutationState, formData: FormData) => Promise<MutationState>;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending
        ? tAccountClient("account.security.email.requesting")
        : tAccountClient("account.security.email.requestSubmit")}
    </Button>
  );
}

export function EmailChangeRequestForm({ action }: EmailChangeRequestFormProps) {
  const [state, formAction] = useActionState(action, initialMutationState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tAccountClient("account.security.email.changeTitle")}</CardTitle>
        <CardDescription>
          {tAccountClient("account.security.email.changeDescription")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Text className="text-sm text-muted-foreground">
          {tAccountClient("account.security.email.changeHelp")}
        </Text>
        <SecurityActionResult
          state={state}
          successTitle={tAccountClient("account.security.email.changeRequested")}
          errorTitle={tAccountClient("account.security.email.changeRequestFailed")}
        />
        <form action={formAction} className="space-y-4" noValidate>
          <FieldSet className="grid gap-4">
            <Field>
              <FieldLabel htmlFor="newEmail">
                {tAccountClient("account.security.email.newEmail")}
              </FieldLabel>
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
              <FieldLabel htmlFor="currentPasswordForEmail">
                {tAccountClient("account.security.password.current")}
              </FieldLabel>
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
              {tAccountClient("account.common.reset")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
