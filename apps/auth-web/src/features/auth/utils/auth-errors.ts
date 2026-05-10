import type { MessageKey } from "@netmetric/i18n";

import { ApiError } from "@/lib/api/api-error";

import { getClientLocale, getTranslator } from "../i18n/auth-i18n.client";

export function getAuthErrorMessage(error: unknown): string {
  const t = getTranslator(getClientLocale());

  if (error instanceof ApiError) {
    const errorCode = error.problem?.errorCode;

    if (errorCode) {
      const key = `auth.error.${errorCode}` as MessageKey;
      const translated = t(key);

      if (translated !== key) {
        return translated;
      }
    }
  }

  return t("auth.error.default");
}
