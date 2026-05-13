import { CrmContractPending } from "@/components/shell/crm-contract-pending";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function PipelinePage() {
  await requireCrmSession("/pipeline");

  return (
    <section className="space-y-6">
      <CrmPageHeader title="Pipeline" description="Pipeline module scaffold is ready." />
      <CrmContractPending module="Pipeline" />
    </section>
  );
}
