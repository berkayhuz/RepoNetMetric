import { CrmEntityListPage } from "@/components/shell/crm-entity-list-page";
import type { CrmEntityTableColumn } from "@/components/shell/crm-entity-table";
import { getOpportunitiesData } from "@/features/opportunities/data/opportunities-data";
import { toListQuery } from "@/features/shared/data/query";
import type { OpportunityListItemDto } from "@/lib/crm-api";
import { crmCapabilityAllows } from "@/lib/crm-auth/crm-capabilities";
import { getCurrentCrmCapabilities } from "@/lib/crm-auth/current-crm-capabilities";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { tCrm } from "@/lib/i18n/crm-i18n";
import { getRequestLocale } from "@/lib/i18n/request-locale";

export default async function OpportunitiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireCrmSession("/opportunities");
  const locale = await getRequestLocale();
  const capabilities = await getCurrentCrmCapabilities();

  const params = await searchParams;
  const query = toListQuery(params);
  const data = await getOpportunitiesData(query, "/opportunities");

  const currentQuery = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") currentQuery.set(key, value);
    if (Array.isArray(value) && value[0]) currentQuery.set(key, value[0]);
  }

  const columns: CrmEntityTableColumn<OpportunityListItemDto>[] = [
    {
      key: "opportunityCode",
      header: tCrm("crm.opportunities.fields.opportunityCode", locale),
      render: (item) => item.opportunityCode,
    },
    {
      key: "name",
      header: tCrm("crm.opportunities.fields.name", locale),
      render: (item) => item.name,
    },
    {
      key: "stage",
      header: tCrm("crm.opportunities.fields.stage", locale),
      render: (item) => tCrm(`crm.opportunities.stage.${item.stage}`, locale),
    },
    {
      key: "status",
      header: tCrm("crm.opportunities.fields.status", locale),
      render: (item) => tCrm(`crm.opportunities.status.${item.status}`, locale),
    },
    {
      key: "estimatedAmount",
      header: tCrm("crm.opportunities.fields.estimatedAmount", locale),
      render: (item) => (item.estimatedAmount ?? "-") as string | number,
    },
    {
      key: "expectedRevenue",
      header: tCrm("crm.opportunities.fields.expectedRevenue", locale),
      render: (item) => (item.expectedRevenue ?? "-") as string | number,
    },
    {
      key: "estimatedCloseDate",
      header: tCrm("crm.opportunities.fields.estimatedCloseDate", locale),
      render: (item) =>
        item.estimatedCloseDate
          ? new Date(item.estimatedCloseDate).toLocaleDateString(locale)
          : "-",
    },
    {
      key: "isActive",
      header: tCrm("crm.opportunities.fields.state", locale),
      render: (item) =>
        item.isActive ? tCrm("crm.common.active", locale) : tCrm("crm.common.inactive", locale),
    },
  ];

  return (
    <CrmEntityListPage
      title={tCrm("crm.opportunities.pages.list.title", locale)}
      description={tCrm("crm.opportunities.pages.list.description", locale)}
      actionPath="/opportunities"
      createPath="/opportunities/new"
      createLabel={tCrm("crm.opportunities.actions.create", locale)}
      canCreate={crmCapabilityAllows(capabilities, "opportunities.create")}
      createDisabledMessage={tCrm("crm.states.readOnly", locale)}
      {...(query.search ? { search: query.search } : {})}
      caption={tCrm("crm.opportunities.pages.list.caption", locale)}
      columns={columns}
      paged={data}
      detailBasePath="/opportunities"
      currentQuery={currentQuery}
    />
  );
}
