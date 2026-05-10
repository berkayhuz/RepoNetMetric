import type { Locale } from "@netmetric/i18n";

import { getTranslator } from "../i18n/auth-i18n.shared";

export function getValidationText(locale: Locale) {
  const t = getTranslator(locale);

  return {
    emailRequired: t("validation.email.required"),
    emailInvalid: t("validation.email.invalid"),
    passwordRequired: t("validation.password.required"),
    passwordMin: t("validation.password.min"),
    passwordMax: t("validation.password.max"),
    confirmPasswordRequired: t("validation.confirmPassword.required"),
    passwordMatch: t("validation.password.match"),
    fullNameMin: t("validation.fullName.min"),
    fullNameMax: t("validation.fullName.max"),
    workspaceNameMin: t("validation.workspaceName.min"),
    workspaceNameMax: t("validation.workspaceName.max"),
    acceptTermsRequired: t("validation.acceptTerms.required"),
    tokenRequired: t("validation.token.required"),
    userIdRequired: t("validation.userId.required"),
    confirmTokenRequired: t("validation.confirmToken.required"),
    codeMin: t("validation.code.min"),
    codeMax: t("validation.code.max"),
    recoveryCodeMin: t("validation.recoveryCode.min"),
    recoveryCodeMax: t("validation.recoveryCode.max"),
    workspaceRequired: t("validation.workspace.required"),
  };
}

export type ValidationText = ReturnType<typeof getValidationText>;
