import { CrmEntityListPage } from "@/components/shell/crm-entity-list-page";
import type { CrmEntityTableColumn } from "@/components/shell/crm-entity-table";
import { getLeadsData } from "@/features/leads/data/leads-data";
import { toListQuery } from "@/features/shared/data/query";
import type { LeadListItemDto } from "@/lib/crm-api";
import { crmCapabilityAllows } from "@/lib/crm-auth/crm-capabilities";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { formatCrmDate } from "@/lib/date-time/crm-date-time";
import { tCrm } from "@/lib/i18n/crm-i18n";
import { getRequestDateSettings } from "@/lib/i18n/request-date-settings";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await requireCrmSession("/leads");
  const dateSettings = await getRequestDateSettings();
  const locale = dateSettings.locale;
  const capabilities = session.capabilities;

  const params = await searchParams;
  const query = toListQuery(params);
  const data = await getLeadsData(query, "/leads");

  const currentQuery = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") currentQuery.set(key, value);
    if (Array.isArray(value) && value[0]) currentQuery.set(key, value[0]);
  }

  const columns: CrmEntityTableColumn<LeadListItemDto>[] = [
    {
      key: "leadCode",
      header: tCrm("crm.leads.fields.leadCode", locale),
      render: (item) => item.leadCode,
    },
    {
      key: "fullName",
      header: tCrm("crm.leads.fields.fullName", locale),
      render: (item) => item.fullName,
    },
    {
      key: "companyName",
      header: tCrm("crm.leads.fields.company", locale),
      render: (item) => item.companyName || "-",
    },
    {
      key: "email",
      header: tCrm("crm.leads.fields.email", locale),
      render: (item) => item.email || "-",
    },
    {
      key: "status",
      header: tCrm("crm.leads.fields.status", locale),
      render: (item) => tCrm(`crm.leads.status.${item.status}`, locale),
    },
    {
      key: "source",
      header: tCrm("crm.leads.fields.source", locale),
      render: (item) => tCrm(`crm.leads.source.${item.source}`, locale),
    },
    {
      key: "nextContactDate",
      header: tCrm("crm.leads.fields.nextContactDate", locale),
      render: (item) => formatCrmDate(item.nextContactDate, dateSettings),
    },
    {
      key: "isActive",
      header: tCrm("crm.leads.fields.state", locale),
      render: (item) =>
        item.isActive ? tCrm("crm.common.active", locale) : tCrm("crm.common.inactive", locale),
    },
  ];

  return (
    <CrmEntityListPage
      title={tCrm("crm.leads.pages.list.title", locale)}
      description={tCrm("crm.leads.pages.list.description", locale)}
      actionPath="/leads"
      createPath="/leads/new"
      createLabel={tCrm("crm.leads.actions.create", locale)}
      canCreate={crmCapabilityAllows(capabilities, "leads.create")}
      createDisabledMessage={tCrm("crm.states.readOnly", locale)}
      {...(query.search ? { search: query.search } : {})}
      caption={tCrm("crm.leads.pages.list.caption", locale)}
      columns={columns}
      paged={data}
      detailBasePath="/leads"
      currentQuery={currentQuery}
    />
  );
}
