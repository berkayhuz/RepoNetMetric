import { CrmContractPending } from "@/components/shell/crm-contract-pending";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function LeadsPage() {
  await requireCrmSession("/leads");

  return (
    <section className="space-y-6">
      <CrmPageHeader title="Leads" description="Leads module scaffold is ready." />
      <CrmContractPending module="Leads" />
    </section>
  );
}
