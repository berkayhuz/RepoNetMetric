import { DashboardModuleGrid } from "@/components/dashboard/dashboard-module-grid";
import { DashboardRecentList } from "@/components/dashboard/dashboard-recent-list";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { DashboardSummaryCard } from "@/components/dashboard/dashboard-summary-card";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { getDashboardData } from "@/features/dashboard/data/dashboard-data";
import { crmModuleRegistry } from "@/features/modules/module-registry";

export default async function DashboardPage() {
  const data = await getDashboardData("/dashboard");

  return (
    <section className="space-y-8">
      <CrmPageHeader
        title="Dashboard"
        description="Read-only CRM overview using confirmed customers, companies, and contacts data."
      />

      <DashboardSection
        title="Summary"
        description="Entity totals from current CRM list responses."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <DashboardSummaryCard
            title="Customers"
            total={data.customerTotal}
            href="/customers"
            description="Total customer records available in CRM."
          />
          <DashboardSummaryCard
            title="Companies"
            total={data.companyTotal}
            href="/companies"
            description="Total company records available in CRM."
          />
          <DashboardSummaryCard
            title="Contacts"
            total={data.contactTotal}
            href="/contacts"
            description="Total contact records available in CRM."
          />
        </div>
      </DashboardSection>

      <DashboardSection
        title="Recent Records"
        description="Latest records loaded from existing list endpoints with small page sizes."
      >
        <div className="grid gap-4 xl:grid-cols-3">
          <DashboardRecentList
            title="Recent customers"
            description="Most recent customer records from the customers list endpoint."
            items={data.recentCustomers}
            detailBasePath="/customers"
          />
          <DashboardRecentList
            title="Recent companies"
            description="Most recent company records from the companies list endpoint."
            items={data.recentCompanies}
            detailBasePath="/companies"
          />
          <DashboardRecentList
            title="Recent contacts"
            description="Most recent contact records from the contacts list endpoint."
            items={data.recentContacts}
            detailBasePath="/contacts"
          />
        </div>
      </DashboardSection>

      <DashboardSection
        title="Module Overview"
        description="Current CRM module map with implementation and contract status."
      >
        <DashboardModuleGrid
          modules={crmModuleRegistry.filter((item) => item.id !== "dashboard")}
        />
      </DashboardSection>
    </section>
  );
}
