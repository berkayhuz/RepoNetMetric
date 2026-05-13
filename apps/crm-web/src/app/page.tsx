import { CrmModuleCard } from "@/components/shell/crm-module-card";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function HomePage() {
  await requireCrmSession("/");

  return (
    <section className="space-y-6">
      <CrmPageHeader
        title="Dashboard"
        description="CRM workspace shell is ready. Data widgets will be connected in upcoming phases."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <CrmModuleCard
          title="Pipeline health"
          description="Placeholder card for pipeline KPIs."
          status="Scaffolded"
        />
        <CrmModuleCard
          title="Tasks due"
          description="Placeholder card for task workload."
          status="Scaffolded"
        />
        <CrmModuleCard
          title="Customer signals"
          description="Placeholder card for customer insights."
          status="Scaffolded"
        />
      </div>
    </section>
  );
}
