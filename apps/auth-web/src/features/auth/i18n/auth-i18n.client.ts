"use client";

import { defaultLocale, getTranslator, resolveLocale, type MessageKey } from "./auth-i18n.shared";

export function getClientLocale() {
  if (typeof document === "undefined") {
    return defaultLocale;
  }

  return resolveLocale(document.documentElement.lang);
}

export function tClient(key: MessageKey): string {
  return getTranslator(getClientLocale())(key);
}

export { getTranslator };
