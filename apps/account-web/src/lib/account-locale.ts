import { resolveLocale, type Locale } from "@netmetric/i18n";

export function mapAccountLanguageToLocale(language: string | null | undefined): Locale {
  if (!language) {
    return "en";
  }

  const normalized = language.trim().toLowerCase();
  if (normalized.startsWith("tr")) {
    return "tr";
  }

  if (normalized.startsWith("en")) {
    return "en";
  }

  return resolveLocale(normalized);
}

export function mapAccountThemeToUiTheme(
  theme: string | null | undefined,
): "system" | "light" | "dark" {
  const normalized = (theme ?? "").trim().toLowerCase();
  if (normalized === "dark") {
    return "dark";
  }

  if (normalized === "light" || normalized === "default") {
    return "light";
  }

  return "system";
}
