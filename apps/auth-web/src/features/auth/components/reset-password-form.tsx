"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
  createResetPasswordSchema,
  type ResetPasswordInput,
} from "@/features/auth/schemas/reset-password.schema";
import { getValidationText } from "@/features/auth/schemas/validation-text";
import { getAuthErrorMessage } from "@/features/auth/utils/auth-errors";
import { toFieldErrors } from "@/lib/validation/zod-error-map";

type ResetPasswordFormProps = {
  email?: string;
  token?: string;
};

export function ResetPasswordForm({ email = "", token = "" }: ResetPasswordFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const schema = createResetPasswordSchema(getValidationText(getClientLocale()));

  function submitResetPassword(input: ResetPasswordInput): void {
    startTransition(async () => {
      setFormError(null);
      setFieldErrors({});

      try {
        await authBrowserApi.resetPassword(input);
        router.replace(`${authRoutes.login}?passwordReset=success`);
      } catch (error) {
        setFormError(getAuthErrorMessage(error));
      }
    });
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const parsed = schema.safeParse({
      email: formData.get("email"),
      token: formData.get("token"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    if (!parsed.success) {
      setFieldErrors(toFieldErrors(parsed.error));
      setFormError(tClient("form.fixErrors"));
      return;
    }

    submitResetPassword(parsed.data);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {formError ? (
        <Alert variant="destructive">
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      ) : null}

      <input type="hidden" name="token" value={token} />

      <FieldSet>
        <Field>
          <FieldLabel htmlFor="email">{tClient("field.email")}</FieldLabel>
          <FieldContent>
            <Input id="email" name="email" type="email" autoComplete="email" defaultValue={email} />
            <FieldError>{fieldErrors.email?.[0]}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">{tClient("field.newPassword")}</FieldLabel>
          <FieldContent>
            <Input id="password" name="password" type="password" autoComplete="new-password" />
            <FieldError>{fieldErrors.password?.[0]}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirmPassword">{tClient("field.newPasswordAgain")}</FieldLabel>
          <FieldContent>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
            />
            <FieldError>{fieldErrors.confirmPassword?.[0]}</FieldError>
          </FieldContent>
        </Field>
      </FieldSet>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? tClient("form.updating") : tClient("action.updatePassword")}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {tClient("auth.reset.backToLoginPrefix")}{" "}
        <Link
          href={authRoutes.login}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          {tClient("auth.reset.backToLoginLink")}
        </Link>
      </p>
    </form>
  );
}
