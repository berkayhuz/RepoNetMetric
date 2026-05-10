import { cookies, headers } from "next/headers";

import {
  createTranslator,
  defaultLocale,
  resolveLocale,
  type Locale,
  type MessageKey,
  type Translate,
} from "@netmetric/i18n";

const localeCookieName = "nm_locale";

function extractLocaleFromAcceptLanguage(value: string | null): Locale {
  if (!value) {
    return defaultLocale;
  }

  const lower = value.toLowerCase();

  if (lower.includes("en")) {
    return "en";
  }

  if (lower.includes("tr")) {
    return "tr";
  }

  return defaultLocale;
}

export async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(localeCookieName)?.value;

  if (cookieLocale) {
    return resolveLocale(cookieLocale);
  }

  const headerStore = await headers();
  return extractLocaleFromAcceptLanguage(headerStore.get("accept-language"));
}

export function getClientLocale(): Locale {
  if (typeof document === "undefined") {
    return defaultLocale;
  }

  return resolveLocale(document.documentElement.lang);
}

export function getTranslator(locale: Locale): Translate {
  return createTranslator(locale);
}

export function tClient(key: MessageKey): string {
  return createTranslator(getClientLocale())(key);
}
