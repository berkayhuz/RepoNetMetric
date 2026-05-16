import { CrmEntityFormShell } from "@/components/forms/crm-entity-form-shell";
import { DealForm } from "@/features/deals/forms/deal-form";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { tCrm } from "@/lib/i18n/crm-i18n";
import { getRequestLocale } from "@/lib/i18n/request-locale";

export default async function NewDealPage() {
  await requireCrmSession("/deals/new");
  const locale = await getRequestLocale();

  return (
    <CrmEntityFormShell
      title={tCrm("crm.deals.pages.create.title", locale)}
      description={tCrm("crm.deals.pages.create.description", locale)}
    >
      <DealForm mode="create" />
    </CrmEntityFormShell>
  );
}
