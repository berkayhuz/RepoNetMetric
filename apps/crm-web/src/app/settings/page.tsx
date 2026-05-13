import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { CrmModuleCard } from "@/components/shell/crm-module-card";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function SettingsPage() {
  await requireCrmSession("/settings");

  return (
    <section className="space-y-6">
      <CrmPageHeader title="Settings" description="CRM settings placeholder." />
      <CrmModuleCard
        title="Workspace settings"
        description="Settings forms will be added once contracts and permissions are finalized."
        status="Placeholder"
      />
    </section>
  );
}
