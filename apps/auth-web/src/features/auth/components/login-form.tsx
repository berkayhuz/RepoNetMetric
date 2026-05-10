"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

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
import { Checkbox } from "@netmetric/ui/client";

import { authBrowserApi } from "@/features/auth/api/auth-browser-api";
import { authRoutes } from "@/features/auth/config/auth-routes";
import { getClientLocale, tClient } from "@/features/auth/i18n/auth-i18n.client";
import { createLoginSchema, type LoginInput } from "@/features/auth/schemas/login.schema";
import { getValidationText } from "@/features/auth/schemas/validation-text";
import { getAuthErrorMessage } from "@/features/auth/utils/auth-errors";
import { getRedirectAfterAuth } from "@/features/auth/utils/redirect-after-auth";
import { toFieldErrors } from "@/lib/validation/zod-error-map";

type LoginFormProps = {
  returnUrl?: string;
};

export function LoginForm({ returnUrl }: LoginFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const resolvedReturnUrl = useMemo(() => returnUrl ?? "", [returnUrl]);
  const schema = useMemo(() => createLoginSchema(getValidationText(getClientLocale())), []);

  function submitLogin(input: LoginInput): void {
    startTransition(async () => {
      setFormError(null);
      setFieldErrors({});

      try {
        const result = await authBrowserApi.login(input);

        if ("mfaRequired" in result && result.mfaRequired) {
          const params = new URLSearchParams();
          params.set("email", input.email);

          if (result.challengeId) {
            params.set("challengeId", result.challengeId);
          }

          if (input.returnUrl) {
            params.set("returnUrl", input.returnUrl);
          }

          router.replace(`${authRoutes.mfa}?${params.toString()}`);
          return;
        }

        const redirectUrl = "redirectUrl" in result ? result.redirectUrl : undefined;
        router.replace(redirectUrl ?? getRedirectAfterAuth(input.returnUrl));
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
      password: formData.get("password"),
      rememberMe: formData.get("rememberMe") === "on",
      tenantId: formData.get("tenantId"),
      returnUrl: resolvedReturnUrl,
    });

    if (!parsed.success) {
      setFieldErrors(toFieldErrors(parsed.error));
      setFormError(tClient("form.fixErrors"));
      return;
    }

    submitLogin(parsed.data);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {formError ? (
        <Alert variant="destructive">
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      ) : null}

      <input type="hidden" name="returnUrl" value={resolvedReturnUrl} />

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

        <Field>
          <div className="flex items-center justify-between gap-4">
            <FieldLabel htmlFor="password">{tClient("field.password")}</FieldLabel>
            <Link
              href={authRoutes.forgotPassword}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {tClient("link.forgotPassword")}
            </Link>
          </div>
          <FieldContent>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              aria-invalid={Boolean(fieldErrors.password?.[0])}
            />
            <FieldError>{fieldErrors.password?.[0]}</FieldError>
          </FieldContent>
        </Field>
      </FieldSet>

      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        <Checkbox name="rememberMe" />
        {tClient("field.rememberMe")}
      </label>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? tClient("action.loggingIn") : tClient("action.login")}
      </Button>
    </form>
  );
}
