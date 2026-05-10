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
import {
  createForgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/features/auth/schemas/forgot-password.schema";
import { getValidationText } from "@/features/auth/schemas/validation-text";
import { getAuthErrorMessage } from "@/features/auth/utils/auth-errors";
import { toFieldErrors } from "@/lib/validation/zod-error-map";

export function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const schema = createForgotPasswordSchema(getValidationText(getClientLocale()));

  function submitForgotPassword(input: ForgotPasswordInput): void {
    startTransition(async () => {
      setSuccessMessage(null);
      setFormError(null);
      setFieldErrors({});

      try {
        await authBrowserApi.forgotPassword(input);
        setSuccessMessage(tClient("success.forgotPasswordSent"));
      } catch (error) {
        setFormError(getAuthErrorMessage(error));
      }
    });
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const parsed = schema.safeParse({ email: formData.get("email") });

    if (!parsed.success) {
      setFieldErrors(toFieldErrors(parsed.error));
      setFormError(tClient("form.fixErrors"));
      return;
    }

    submitForgotPassword(parsed.data);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
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

      <FieldSet>
        <Field>
          <FieldLabel htmlFor="email">{tClient("field.email")}</FieldLabel>
          <FieldContent>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(fieldErrors.email?.[0])}
            />
            <FieldError>{fieldErrors.email?.[0]}</FieldError>
          </FieldContent>
        </Field>
      </FieldSet>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? tClient("form.sending") : tClient("action.sendResetLink")}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {tClient("auth.forgot.backToLoginPrefix")}{" "}
        <Link
          href={authRoutes.login}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          {tClient("link.login")}
        </Link>
      </p>
    </form>
  );
}
