import { CrmContractPending } from "@/components/shell/crm-contract-pending";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function ActivitiesPage() {
  await requireCrmSession("/activities");

  return (
    <section className="space-y-6">
      <CrmPageHeader title="Activities" description="Activities module scaffold is ready." />
      <CrmContractPending module="Activities" />
    </section>
  );
}
