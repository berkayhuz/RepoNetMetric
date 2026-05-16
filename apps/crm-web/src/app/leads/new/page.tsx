import { CrmEntityFormShell } from "@/components/forms/crm-entity-form-shell";
import { LeadForm } from "@/features/leads/forms/lead-form";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { tCrm } from "@/lib/i18n/crm-i18n";
import { getRequestLocale } from "@/lib/i18n/request-locale";

export default async function NewLeadPage() {
  await requireCrmSession("/leads/new");
  const locale = await getRequestLocale();

  return (
    <CrmEntityFormShell
      title={tCrm("crm.leads.pages.create.title", locale)}
      description={tCrm("crm.leads.pages.create.description", locale)}
    >
      <LeadForm mode="create" />
    </CrmEntityFormShell>
  );
}
