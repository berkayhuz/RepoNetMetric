import { CrmEntityFormShell } from "@/components/forms/crm-entity-form-shell";
import { OpportunityForm } from "@/features/opportunities/forms/opportunity-form";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function NewOpportunityPage() {
  await requireCrmSession("/opportunities/new");

  return (
    <CrmEntityFormShell title="Create Opportunity" description="Add a new opportunity record.">
      <OpportunityForm mode="create" />
    </CrmEntityFormShell>
  );
}
