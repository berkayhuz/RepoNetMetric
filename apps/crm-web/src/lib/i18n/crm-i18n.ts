import { resolveLocale } from "@netmetric/i18n";

type CrmShellKey =
  | "nav.dashboard"
  | "nav.customers"
  | "nav.companies"
  | "nav.contacts"
  | "nav.leads"
  | "nav.opportunities"
  | "nav.pipeline"
  | "nav.tasks"
  | "nav.activities"
  | "nav.settings";

const messages: Record<"en" | "tr", Record<CrmShellKey, string>> = {
  en: {
    "nav.dashboard": "Dashboard",
    "nav.customers": "Customers",
    "nav.companies": "Companies",
    "nav.contacts": "Contacts",
    "nav.leads": "Leads",
    "nav.opportunities": "Opportunities",
    "nav.pipeline": "Pipeline",
    "nav.tasks": "Tasks",
    "nav.activities": "Activities",
    "nav.settings": "Settings",
  },
  tr: {
    "nav.dashboard": "Gosterge Paneli",
    "nav.customers": "Musteriler",
    "nav.companies": "Sirketler",
    "nav.contacts": "Kisiler",
    "nav.leads": "Adaylar",
    "nav.opportunities": "Firsatlar",
    "nav.pipeline": "Pipeline",
    "nav.tasks": "Gorevler",
    "nav.activities": "Aktiviteler",
    "nav.settings": "Ayarlar",
  },
};

export function tCrmShell(key: CrmShellKey, localeInput?: string | null): string {
  const locale = resolveLocale(localeInput);
  const dictionary = locale.toLowerCase().startsWith("tr") ? messages.tr : messages.en;
  return dictionary[key] ?? messages.en[key];
}
