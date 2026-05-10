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
import { authRoutes, externalRoutes } from "@/features/auth/config/auth-routes";
import { getClientLocale, tClient } from "@/features/auth/i18n/auth-i18n.client";
import { createRegisterSchema, type RegisterInput } from "@/features/auth/schemas/register.schema";
import { getValidationText } from "@/features/auth/schemas/validation-text";
import { getAuthErrorMessage } from "@/features/auth/utils/auth-errors";
import { getRedirectAfterAuth } from "@/features/auth/utils/redirect-after-auth";
import { toFieldErrors } from "@/lib/validation/zod-error-map";

type RegisterFormProps = { returnUrl?: string };

export function RegisterForm({ returnUrl }: RegisterFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const schema = useMemo(() => createRegisterSchema(getValidationText(getClientLocale())), []);

  function submitRegister(input: RegisterInput): void {
    startTransition(async () => {
      setFormError(null);
      setFieldErrors({});

      try {
        const result = await authBrowserApi.register(input);

        if (result.emailConfirmationRequired) {
          const params = new URLSearchParams();
          params.set("email", input.email);
          router.replace(`${authRoutes.confirmEmail}?${params.toString()}`);
          return;
        }

        router.replace(result.redirectUrl ?? getRedirectAfterAuth(input.returnUrl));
      } catch (error) {
        setFormError(getAuthErrorMessage(error));
      }
    });
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const parsed = schema.safeParse({
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      workspaceName: formData.get("workspaceName"),
      acceptTerms,
      returnUrl,
    });

    if (!parsed.success) {
      setFieldErrors(toFieldErrors(parsed.error));
      setFormError(tClient("form.fixErrors"));
      return;
    }

    submitRegister(parsed.data);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {formError ? (
        <Alert variant="destructive">
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      ) : null}

      <FieldSet>
        <Field>
          <FieldLabel htmlFor="fullName">{tClient("field.fullName")}</FieldLabel>
          <FieldContent>
            <Input id="fullName" name="fullName" autoComplete="name" />
            <FieldError>{fieldErrors.fullName?.[0]}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="email">{tClient("field.email")}</FieldLabel>
          <FieldContent>
            <Input id="email" name="email" type="email" autoComplete="email" />
            <FieldError>{fieldErrors.email?.[0]}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">{tClient("field.password")}</FieldLabel>
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
        <Field>
          <FieldLabel htmlFor="workspaceName">{tClient("field.workspaceName")}</FieldLabel>
          <FieldContent>
            <Input id="workspaceName" name="workspaceName" />
            <FieldError>{fieldErrors.workspaceName?.[0]}</FieldError>
          </FieldContent>
        </Field>
      </FieldSet>

      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        <Checkbox
          checked={acceptTerms}
          onCheckedChange={(checked) => setAcceptTerms(checked === true)}
        />
        <span>
          {tClient("field.acceptTerms")} (
          <Link href={externalRoutes.terms} className="underline">
            {tClient("nav.terms")}
          </Link>
          )
        </span>
      </label>
      <FieldError>{fieldErrors.acceptTerms?.[0]}</FieldError>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? tClient("action.registering") : tClient("action.register")}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {tClient("auth.register.hasAccount")}{" "}
        <Link
          href={authRoutes.login}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          {tClient("auth.register.goLogin")}
        </Link>
      </p>
    </form>
  );
}
