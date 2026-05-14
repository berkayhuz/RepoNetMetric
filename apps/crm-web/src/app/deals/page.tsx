import { CrmEntityListPage } from "@/components/shell/crm-entity-list-page";
import type { CrmEntityTableColumn } from "@/components/shell/crm-entity-table";
import { getDealsData } from "@/features/deals/data/deals-data";
import { toListQuery } from "@/features/shared/data/query";
import type { DealListItemDto } from "@/lib/crm-api";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

const columns: CrmEntityTableColumn<DealListItemDto>[] = [
  { key: "dealCode", header: "Code", render: (item) => item.dealCode },
  { key: "name", header: "Name", render: (item) => item.name },
  {
    key: "totalAmount",
    header: "Amount",
    render: (item) => (item.totalAmount ?? "-") as string | number,
  },
  {
    key: "closedDate",
    header: "Closed date",
    render: (item) => new Date(item.closedDate).toLocaleDateString("en-GB"),
  },
  { key: "stage", header: "Stage", render: (item) => String(item.stage) },
  { key: "outcome", header: "Outcome", render: (item) => String(item.outcome) },
  { key: "isActive", header: "State", render: (item) => (item.isActive ? "Active" : "Inactive") },
];

export default async function DealsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireCrmSession("/deals");

  const params = await searchParams;
  const query = toListQuery(params);
  const data = await getDealsData(query, "/deals");

  const currentQuery = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") currentQuery.set(key, value);
    if (Array.isArray(value) && value[0]) currentQuery.set(key, value[0]);
  }

  return (
    <CrmEntityListPage
      title="Deals"
      description="Deal records from consolidated CRM API."
      actionPath="/deals"
      createPath="/deals/new"
      createLabel="Create deal"
      {...(query.search ? { search: query.search } : {})}
      caption="Deals"
      columns={columns}
      paged={data}
      detailBasePath="/deals"
      currentQuery={currentQuery}
    />
  );
}
