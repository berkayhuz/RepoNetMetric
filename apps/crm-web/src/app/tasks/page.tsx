import { CrmContractPending } from "@/components/shell/crm-contract-pending";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function TasksPage() {
  await requireCrmSession("/tasks");

  return (
    <section className="space-y-6">
      <CrmPageHeader title="Tasks" description="Tasks module scaffold is ready." />
      <CrmContractPending module="Tasks" />
    </section>
  );
}
