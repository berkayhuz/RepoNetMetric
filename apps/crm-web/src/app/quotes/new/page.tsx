import { CrmEntityFormShell } from "@/components/forms/crm-entity-form-shell";
import { QuoteForm } from "@/features/quotes/forms/quote-form";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function NewQuotePage() {
  await requireCrmSession("/quotes/new");

  return (
    <CrmEntityFormShell title="Create Quote" description="Add a new quote record.">
      <QuoteForm mode="create" />
    </CrmEntityFormShell>
  );
}
