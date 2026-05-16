import { CrmEntityListPage } from "@/components/shell/crm-entity-list-page";
import type { CrmEntityTableColumn } from "@/components/shell/crm-entity-table";
import { getDealsData } from "@/features/deals/data/deals-data";
import { toListQuery } from "@/features/shared/data/query";
import type { DealListItemDto } from "@/lib/crm-api";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { tCrm } from "@/lib/i18n/crm-i18n";
import { getRequestLocale } from "@/lib/i18n/request-locale";

export default async function DealsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireCrmSession("/deals");
  const locale = await getRequestLocale();

  const params = await searchParams;
  const query = toListQuery(params);
  const data = await getDealsData(query, "/deals");

  const currentQuery = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") currentQuery.set(key, value);
    if (Array.isArray(value) && value[0]) currentQuery.set(key, value[0]);
  }

  const columns: CrmEntityTableColumn<DealListItemDto>[] = [
    {
      key: "dealCode",
      header: tCrm("crm.deals.fields.dealCode", locale),
      render: (item) => item.dealCode,
    },
    { key: "name", header: tCrm("crm.deals.fields.name", locale), render: (item) => item.name },
    {
      key: "totalAmount",
      header: tCrm("crm.deals.fields.totalAmount", locale),
      render: (item) => (item.totalAmount ?? "-") as string | number,
    },
    {
      key: "closedDate",
      header: tCrm("crm.deals.fields.closedDate", locale),
      render: (item) => new Date(item.closedDate).toLocaleDateString(locale),
    },
    {
      key: "stage",
      header: tCrm("crm.deals.fields.stage", locale),
      render: (item) => tCrm(`crm.deals.stage.${item.stage}`, locale),
    },
    {
      key: "outcome",
      header: tCrm("crm.deals.fields.outcome", locale),
      render: (item) => String(item.outcome),
    },
    {
      key: "isActive",
      header: tCrm("crm.deals.fields.state", locale),
      render: (item) =>
        item.isActive ? tCrm("crm.common.active", locale) : tCrm("crm.common.inactive", locale),
    },
  ];

  return (
    <CrmEntityListPage
      title={tCrm("crm.deals.pages.list.title", locale)}
      description={tCrm("crm.deals.pages.list.description", locale)}
      actionPath="/deals"
      createPath="/deals/new"
      createLabel={tCrm("crm.deals.actions.create", locale)}
      {...(query.search ? { search: query.search } : {})}
      caption={tCrm("crm.deals.pages.list.caption", locale)}
      columns={columns}
      paged={data}
      detailBasePath="/deals"
      currentQuery={currentQuery}
    />
  );
}
