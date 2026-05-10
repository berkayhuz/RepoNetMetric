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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@netmetric/ui/client";

import { authBrowserApi } from "@/features/auth/api/auth-browser-api";
import { authRoutes } from "@/features/auth/config/auth-routes";
import { getClientLocale, tClient } from "@/features/auth/i18n/auth-i18n.client";
import { createMfaSchema, type MfaInput } from "@/features/auth/schemas/mfa.schema";
import { getValidationText } from "@/features/auth/schemas/validation-text";
import { getAuthErrorMessage } from "@/features/auth/utils/auth-errors";
import { getRedirectAfterAuth } from "@/features/auth/utils/redirect-after-auth";
import { toFieldErrors } from "@/lib/validation/zod-error-map";

type MfaFormProps = { email?: string; challengeId?: string; returnUrl?: string };

export function MfaForm({ email = "", challengeId = "", returnUrl = "" }: MfaFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [code, setCode] = useState("");

  const schema = useMemo(() => createMfaSchema(getValidationText(getClientLocale())), []);

  function submitMfa(input: MfaInput): void {
    startTransition(async () => {
      setFormError(null);
      setFieldErrors({});

      try {
        const result = await authBrowserApi.verifyMfa(input);
        if ("mfaRequired" in result && result.mfaRequired) {
          setFormError(tClient("auth.error.mfa_invalid"));
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
      code,
      challengeId: formData.get("challengeId"),
      returnUrl,
    });

    if (!parsed.success) {
      setFieldErrors(toFieldErrors(parsed.error));
      setFormError(tClient("form.fixErrors"));
      return;
    }

    submitMfa(parsed.data);
  }

  const recoveryHref = `${authRoutes.recoveryCode}?${new URLSearchParams({ email, challengeId, returnUrl }).toString()}`;

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {formError ? (
        <Alert variant="destructive">
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      ) : null}

      <input type="hidden" name="challengeId" value={challengeId} />

      <FieldSet>
        <Field>
          <FieldLabel htmlFor="email">{tClient("field.email")}</FieldLabel>
          <FieldContent>
            <Input id="email" name="email" type="email" defaultValue={email} autoComplete="email" />
            <FieldError>{fieldErrors.email?.[0]}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">{tClient("field.password")}</FieldLabel>
          <FieldContent>
            <Input id="password" name="password" type="password" autoComplete="current-password" />
            <FieldError>{fieldErrors.password?.[0]}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>{tClient("field.code")}</FieldLabel>
          <FieldContent>
            <InputOTP maxLength={6} value={code} onChange={setCode}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <FieldError>{fieldErrors.code?.[0]}</FieldError>
          </FieldContent>
        </Field>
      </FieldSet>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? tClient("form.verifying") : tClient("common.continue")}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {tClient("hint.noCodeAccess")}{" "}
        <Link
          href={recoveryHref}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          {tClient("link.useRecovery")}
        </Link>
      </p>
    </form>
  );
}
