export const supportedLocales = ["tr", "en"] as const;

export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = "tr";

export function isLocale(value: string | null | undefined): value is Locale {
  return Boolean(value && supportedLocales.includes(value as Locale));
}
