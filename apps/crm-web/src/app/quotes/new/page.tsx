import { CrmEntityFormShell } from "@/components/forms/crm-entity-form-shell";
import { QuoteForm } from "@/features/quotes/forms/quote-form";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { tCrm } from "@/lib/i18n/crm-i18n";
import { getRequestLocale } from "@/lib/i18n/request-locale";

export default async function NewQuotePage() {
  await requireCrmSession("/quotes/new");
  const locale = await getRequestLocale();

  return (
    <CrmEntityFormShell
      title={tCrm("crm.quotes.create.title", locale)}
      description={tCrm("crm.quotes.create.description", locale)}
    >
      <QuoteForm mode="create" />
    </CrmEntityFormShell>
  );
}
