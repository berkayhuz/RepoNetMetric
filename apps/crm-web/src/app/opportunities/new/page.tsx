import { CrmEntityFormShell } from "@/components/forms/crm-entity-form-shell";
import { OpportunityForm } from "@/features/opportunities/forms/opportunity-form";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { tCrm } from "@/lib/i18n/crm-i18n";
import { getRequestLocale } from "@/lib/i18n/request-locale";

export default async function NewOpportunityPage() {
  await requireCrmSession("/opportunities/new");
  const locale = await getRequestLocale();

  return (
    <CrmEntityFormShell
      title={tCrm("crm.opportunities.pages.create.title", locale)}
      description={tCrm("crm.opportunities.pages.create.description", locale)}
    >
      <OpportunityForm mode="create" />
    </CrmEntityFormShell>
  );
}
