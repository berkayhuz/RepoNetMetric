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
  FieldError,
  Input,
  Text,
} from "@netmetric/ui";

import { initialMutationState, type MutationState } from "../actions/mutation-state";
import { SecurityActionResult } from "./security-action-result";

type EmailChangeConfirmPanelProps = {
  action: (state: MutationState, formData: FormData) => Promise<MutationState>;
  tokenFromQuery: string | undefined;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Confirming..." : "Confirm email change"}
    </Button>
  );
}

export function EmailChangeConfirmPanel({ action, tokenFromQuery }: EmailChangeConfirmPanelProps) {
  const [state, formAction] = useActionState(action, initialMutationState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Confirm email change</CardTitle>
        <CardDescription>
          Complete email change after receiving your confirmation token.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Text className="text-sm text-muted-foreground">
          Use the token from your verification link to complete this action.
        </Text>
        <SecurityActionResult
          state={state}
          successTitle="Email confirmed"
          errorTitle="Email confirmation failed"
        />

        <form action={formAction} className="space-y-4" noValidate>
          {tokenFromQuery ? <input type="hidden" name="token" value={tokenFromQuery} /> : null}
          {!tokenFromQuery ? (
            <>
              <Input
                name="token"
                aria-label="Email confirmation token"
                aria-invalid={Boolean(state.fieldErrors?.token?.[0])}
                aria-describedby={state.fieldErrors?.token?.[0] ? "token-error" : undefined}
              />
              <FieldError id="token-error">{state.fieldErrors?.token?.[0]}</FieldError>
            </>
          ) : null}
          <div className="flex flex-wrap items-center gap-2">
            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
