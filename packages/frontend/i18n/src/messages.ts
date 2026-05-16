import { availableMessageLocales, messageRegistry } from "./message-registry.generated";
import { canonicalizeLocale, defaultLocale, type Locale } from "./locales";

export type Messages = typeof messageRegistry.en;
export type MessageKey = keyof Messages;

const dictionaries: Record<string, Messages> = Object.fromEntries(
  Object.entries(messageRegistry).map(([locale, messages]) => [locale.toLowerCase(), messages]),
);

function toLanguageTag(value: string): string {
  const normalized = canonicalizeLocale(value);
  return (normalized ?? value).toLowerCase();
}

function resolveDictionary(locale: Locale): Messages | null {
  const normalized = toLanguageTag(locale);
  const direct = dictionaries[normalized];
  if (direct) {
    return direct;
  }

  const languageSubtag = normalized.split("-")[0];
  if (!languageSubtag) {
    return null;
  }

  const languageMatch = dictionaries[languageSubtag];
  if (languageMatch) {
    return languageMatch;
  }

  const partialMatchKey = Object.keys(dictionaries).find((key) =>
    key.startsWith(`${languageSubtag}-`),
  );
  if (!partialMatchKey) {
    return null;
  }

  return dictionaries[partialMatchKey] ?? null;
}

export function getMessages(locale: Locale): Messages {
  return resolveDictionary(locale) ?? getFallbackMessages();
}

export function getFallbackMessages(): Messages {
  const fallback = resolveDictionary(defaultLocale);
  if (fallback) {
    return fallback;
  }

  return messageRegistry.en;
}

export function getAvailableMessageLocales(): readonly string[] {
  return availableMessageLocales;
}
