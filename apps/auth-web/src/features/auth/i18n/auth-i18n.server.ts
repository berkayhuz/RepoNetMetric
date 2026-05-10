import { cookies, headers } from "next/headers";

import { defaultLocale, getTranslator, resolveLocale, type Locale } from "./auth-i18n.shared";

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

export { getTranslator };
