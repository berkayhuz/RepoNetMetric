import en from "./messages/en.json";
import tr from "./messages/tr.json";

export const availableMessageLocales = ["en", "tr"] as const;

export const messageRegistry = {
  en: en,
  tr: tr,
} as const;
