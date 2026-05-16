import { resolveLocale, resolveThemePreference } from "@netmetric/i18n";

export function resolvePreferenceCookiesFromPayload(payload: { theme: string; language: string }): {
  theme: "light" | "dark" | "system";
  locale: string;
} {
  return {
    theme: resolveThemePreference(payload.theme),
    locale: resolveLocale(payload.language),
  };
}
