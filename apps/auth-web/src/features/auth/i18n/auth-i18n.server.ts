import { cookies, headers } from "next/headers";

import { defaultLocale, getTranslator, resolveLocale, type Locale } from "./auth-i18n.shared";

const localeCookieName = "nm_locale";

function extractLocaleFromAcceptLanguage(value: string | null): Locale {
  if (!value) {
    return defaultLocale;
  }

  const parts = value.split(",");
  for (const part of parts) {
    const candidate = part.split(";")[0]?.trim();
    if (!candidate) {
      continue;
    }

    const resolved = resolveLocale(candidate);
    if (resolved !== defaultLocale || candidate.toLowerCase().startsWith(defaultLocale)) {
      return resolved;
    }
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
