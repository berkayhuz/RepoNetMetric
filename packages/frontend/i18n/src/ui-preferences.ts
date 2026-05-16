import { defaultLocale, type Locale } from "./locales";
import { resolveLocale } from "./translate";

export type UiThemePreference = "light" | "dark" | "system";

export const UI_THEME_COOKIE_NAME = "netmetric-theme";
export const UI_LOCALE_COOKIE_NAME = "netmetric-locale";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

type SameSite = "lax" | "strict" | "none";

export type UiPreferenceCookieOptions = {
  path: string;
  sameSite: SameSite;
  secure: boolean;
  maxAge: number;
  domain?: string;
};

export function resolveThemePreference(value: string | null | undefined): UiThemePreference {
  const normalized = (value ?? "").trim().toLowerCase();
  if (normalized === "light" || normalized === "dark" || normalized === "system") {
    return normalized;
  }

  if (normalized === "default") {
    return "system";
  }

  return "system";
}

export function resolveLocalePreference(value: string | null | undefined): Locale {
  return resolveLocale(value);
}

export function resolveUiPreferences(options?: {
  theme?: string | null | undefined;
  locale?: string | null | undefined;
}): { theme: UiThemePreference; locale: Locale } {
  return {
    theme: resolveThemePreference(options?.theme),
    locale: resolveLocalePreference(options?.locale),
  };
}

export function extractLocaleFromAcceptLanguage(value: string | null): Locale {
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

function isLocalHostname(hostname: string): boolean {
  const normalized = hostname.trim().toLowerCase();
  return normalized === "localhost" || normalized === "127.0.0.1" || normalized === "::1";
}

function normalizeCookieDomain(value: string | undefined): string | undefined {
  const normalized = value?.trim();
  if (!normalized) {
    return undefined;
  }

  const lowered = normalized.toLowerCase();
  if (lowered === "localhost" || lowered === "127.0.0.1" || lowered === "::1") {
    return undefined;
  }

  return normalized;
}

export function getPreferenceCookieOptions(config: {
  appOrigin: string;
  cookieDomain?: string | undefined;
  maxAge?: number | undefined;
}): UiPreferenceCookieOptions {
  const hostname = new URL(config.appOrigin).hostname;
  const isLocal = isLocalHostname(hostname);
  const domain = isLocal ? undefined : normalizeCookieDomain(config.cookieDomain);

  return {
    path: "/",
    sameSite: "lax",
    secure: !isLocal,
    maxAge: config.maxAge ?? ONE_YEAR_SECONDS,
    ...(domain ? { domain } : {}),
  };
}
