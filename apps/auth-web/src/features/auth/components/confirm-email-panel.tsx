"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

import {
  Alert,
  AlertDescription,
  Button,
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  FieldSet,
  Input,
} from "@netmetric/ui";

import { authBrowserApi } from "@/features/auth/api/auth-browser-api";
import { authRoutes } from "@/features/auth/config/auth-routes";
import { getClientLocale, tClient } from "@/features/auth/i18n/auth-i18n.client";
import { createConfirmEmailSchema } from "@/features/auth/schemas/confirm-email.schema";
import { createForgotPasswordSchema } from "@/features/auth/schemas/forgot-password.schema";
import { getValidationText } from "@/features/auth/schemas/validation-text";
import { getAuthErrorMessage } from "@/features/auth/utils/auth-errors";
import { toFieldErrors } from "@/lib/validation/zod-error-map";

type ConfirmEmailPanelProps = { userId?: string; token?: string; email?: string };

export function ConfirmEmailPanel({ userId = "", token = "", email = "" }: ConfirmEmailPanelProps) {
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validation = getValidationText(getClientLocale());
  const confirmSchema = createConfirmEmailSchema(validation);
  const resendSchema = createForgotPasswordSchema(validation);
  const canConfirm = userId.length > 0 && token.length > 0;

  function confirmEmail(): void {
    const parsed = confirmSchema.safeParse({ userId, token });

    if (!parsed.success) {
      setFieldErrors(toFieldErrors(parsed.error));
      setFormError(tClient("form.invalidVerificationLink"));
      return;
    }

    startTransition(async () => {
      setFormError(null);
      setSuccessMessage(null);
      try {
        await authBrowserApi.confirmEmail(parsed.data);
        setSuccessMessage(tClient("success.emailConfirmed"));
      } catch (error) {
        setFormError(getAuthErrorMessage(error));
      }
    });
  }

  function resendConfirmation(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const parsed = resendSchema.safeParse({ email: formData.get("email") });

    if (!parsed.success) {
      setFieldErrors(toFieldErrors(parsed.error));
      setFormError(tClient("form.enterValidEmail"));
      return;
    }

    startTransition(async () => {
      setFormError(null);
      setSuccessMessage(null);
      try {
        await authBrowserApi.resendConfirmEmail(parsed.data);
        setSuccessMessage(tClient("success.confirmationSent"));
      } catch (error) {
        setFormError(getAuthErrorMessage(error));
      }
    });
  }

  return (
    <div className="space-y-5">
      {formError ? (
        <Alert variant="destructive">
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      ) : null}
      {successMessage ? (
        <Alert>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      ) : null}

      {canConfirm ? (
        <Button type="button" onClick={confirmEmail} disabled={isPending} className="w-full">
          {isPending ? tClient("form.verifying") : tClient("action.confirmEmail")}
        </Button>
      ) : (
        <form onSubmit={resendConfirmation} className="space-y-4" noValidate>
          <FieldSet>
            <Field>
              <FieldLabel htmlFor="email">{tClient("field.email")}</FieldLabel>
              <FieldContent>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={email}
                  autoComplete="email"
                />
                <FieldError>{fieldErrors.email?.[0]}</FieldError>
              </FieldContent>
            </Field>
          </FieldSet>
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? tClient("form.sending") : tClient("action.resendEmailConfirmation")}
          </Button>
        </form>
      )}

      <p className="text-center text-sm text-muted-foreground">
        {tClient("hint.emailConfirmedLogin")}{" "}
        <Link
          href={authRoutes.login}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          {tClient("link.login")}
        </Link>
      </p>
    </div>
  );
}
