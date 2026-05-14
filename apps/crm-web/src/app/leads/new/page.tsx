import { CrmEntityFormShell } from "@/components/forms/crm-entity-form-shell";
import { LeadForm } from "@/features/leads/forms/lead-form";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function NewLeadPage() {
  await requireCrmSession("/leads/new");

  return (
    <CrmEntityFormShell title="Create Lead" description="Add a new lead record.">
      <LeadForm mode="create" />
    </CrmEntityFormShell>
  );
}
