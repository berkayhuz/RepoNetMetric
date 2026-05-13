import { CrmContractPending } from "@/components/shell/crm-contract-pending";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function OpportunitiesPage() {
  await requireCrmSession("/opportunities");

  return (
    <section className="space-y-6">
      <CrmPageHeader title="Opportunities" description="Opportunities module scaffold is ready." />
      <CrmContractPending module="Opportunities" />
    </section>
  );
}
