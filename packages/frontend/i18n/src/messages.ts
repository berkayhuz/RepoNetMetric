import en from "./messages/en.json";
import tr from "./messages/tr.json";

import { defaultLocale, type Locale } from "./locales";

export type Messages = typeof en;
export type MessageKey = keyof Messages;

const dictionaries: Record<Locale, Messages> = {
  en,
  tr,
};

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale];
}

export function getFallbackMessages(): Messages {
  return dictionaries[defaultLocale];
}
