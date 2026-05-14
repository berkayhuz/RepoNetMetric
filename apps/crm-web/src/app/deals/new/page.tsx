import { CrmEntityFormShell } from "@/components/forms/crm-entity-form-shell";
import { DealForm } from "@/features/deals/forms/deal-form";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function NewDealPage() {
  await requireCrmSession("/deals/new");

  return (
    <CrmEntityFormShell title="Create Deal" description="Add a new deal record.">
      <DealForm mode="create" />
    </CrmEntityFormShell>
  );
}
