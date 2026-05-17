import { DashboardModuleGrid } from "@/components/dashboard/dashboard-module-grid";
import { DashboardRecentList } from "@/components/dashboard/dashboard-recent-list";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { DashboardSummaryCard } from "@/components/dashboard/dashboard-summary-card";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { getDashboardData } from "@/features/dashboard/data/dashboard-data";
import { crmModuleRegistry } from "@/features/modules/module-registry";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { tCrm } from "@/lib/i18n/crm-i18n";
import { getRequestLocale } from "@/lib/i18n/request-locale";

export default async function DashboardPage() {
  const session = await requireCrmSession("/dashboard");
  const locale = await getRequestLocale();
  const capabilities = session.capabilities;
  const data = await getDashboardData("/dashboard");

  return (
    <section className="space-y-8">
      <CrmPageHeader
        title={tCrm("crm.dashboard.title", locale)}
        description={tCrm("crm.dashboard.description", locale)}
      />

      <DashboardSection
        title={tCrm("crm.dashboard.summary.title", locale)}
        description={tCrm("crm.dashboard.summary.description", locale)}
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <DashboardSummaryCard
            title={tCrm("crm.dashboard.customers.title", locale)}
            total={data.customerTotal}
            href="/customers"
            description={tCrm("crm.dashboard.customers.description", locale)}
            summaryAriaLabel={tCrm("crm.dashboard.summaryCardAria", locale, {
              title: tCrm("crm.dashboard.customers.title", locale),
            })}
            readOnlyLabel={tCrm("crm.states.readOnly", locale)}
            viewAllLabel={tCrm("crm.actions.viewAll", locale)}
          />
          <DashboardSummaryCard
            title={tCrm("crm.dashboard.companies.title", locale)}
            total={data.companyTotal}
            href="/companies"
            description={tCrm("crm.dashboard.companies.description", locale)}
            summaryAriaLabel={tCrm("crm.dashboard.summaryCardAria", locale, {
              title: tCrm("crm.dashboard.companies.title", locale),
            })}
            readOnlyLabel={tCrm("crm.states.readOnly", locale)}
            viewAllLabel={tCrm("crm.actions.viewAll", locale)}
          />
          <DashboardSummaryCard
            title={tCrm("crm.dashboard.contacts.title", locale)}
            total={data.contactTotal}
            href="/contacts"
            description={tCrm("crm.dashboard.contacts.description", locale)}
            summaryAriaLabel={tCrm("crm.dashboard.summaryCardAria", locale, {
              title: tCrm("crm.dashboard.contacts.title", locale),
            })}
            readOnlyLabel={tCrm("crm.states.readOnly", locale)}
            viewAllLabel={tCrm("crm.actions.viewAll", locale)}
          />
        </div>
      </DashboardSection>

      <DashboardSection
        title={tCrm("crm.dashboard.recent.title", locale)}
        description={tCrm("crm.dashboard.recent.description", locale)}
      >
        <div className="grid gap-4 xl:grid-cols-3">
          <DashboardRecentList
            title={tCrm("crm.dashboard.recentCustomers.title", locale)}
            description={tCrm("crm.dashboard.recentCustomers.description", locale)}
            items={data.recentCustomers}
            detailBasePath="/customers"
            emptyTitle={tCrm("crm.states.empty.title", locale)}
            emptyDescription={tCrm("crm.states.empty.description", locale)}
          />
          <DashboardRecentList
            title={tCrm("crm.dashboard.recentCompanies.title", locale)}
            description={tCrm("crm.dashboard.recentCompanies.description", locale)}
            items={data.recentCompanies}
            detailBasePath="/companies"
            emptyTitle={tCrm("crm.states.empty.title", locale)}
            emptyDescription={tCrm("crm.states.empty.description", locale)}
          />
          <DashboardRecentList
            title={tCrm("crm.dashboard.recentContacts.title", locale)}
            description={tCrm("crm.dashboard.recentContacts.description", locale)}
            items={data.recentContacts}
            detailBasePath="/contacts"
            emptyTitle={tCrm("crm.states.empty.title", locale)}
            emptyDescription={tCrm("crm.states.empty.description", locale)}
          />
        </div>
      </DashboardSection>

      <DashboardSection
        title={tCrm("crm.dashboard.modules.title", locale)}
        description={tCrm("crm.dashboard.modules.description", locale)}
      >
        <DashboardModuleGrid
          modules={crmModuleRegistry.filter((item) => item.id !== "dashboard")}
          locale={locale}
          capabilities={capabilities}
        />
      </DashboardSection>
    </section>
  );
}
