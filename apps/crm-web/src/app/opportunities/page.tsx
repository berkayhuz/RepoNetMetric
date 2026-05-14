import { CrmEntityListPage } from "@/components/shell/crm-entity-list-page";
import type { CrmEntityTableColumn } from "@/components/shell/crm-entity-table";
import { getOpportunitiesData } from "@/features/opportunities/data/opportunities-data";
import { toListQuery } from "@/features/shared/data/query";
import type { OpportunityListItemDto } from "@/lib/crm-api";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

const columns: CrmEntityTableColumn<OpportunityListItemDto>[] = [
  { key: "opportunityCode", header: "Code", render: (item) => item.opportunityCode },
  { key: "name", header: "Name", render: (item) => item.name },
  { key: "stage", header: "Stage", render: (item) => String(item.stage) },
  { key: "status", header: "Status", render: (item) => String(item.status) },
  {
    key: "estimatedAmount",
    header: "Estimated",
    render: (item) => (item.estimatedAmount ?? "-") as string | number,
  },
  {
    key: "expectedRevenue",
    header: "Expected revenue",
    render: (item) => (item.expectedRevenue ?? "-") as string | number,
  },
  {
    key: "estimatedCloseDate",
    header: "Close date",
    render: (item) =>
      item.estimatedCloseDate ? new Date(item.estimatedCloseDate).toLocaleDateString("en-GB") : "-",
  },
  {
    key: "isActive",
    header: "State",
    render: (item) => (item.isActive ? "Active" : "Inactive"),
  },
];

export default async function OpportunitiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireCrmSession("/opportunities");

  const params = await searchParams;
  const query = toListQuery(params);
  const data = await getOpportunitiesData(query, "/opportunities");

  const currentQuery = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") currentQuery.set(key, value);
    if (Array.isArray(value) && value[0]) currentQuery.set(key, value[0]);
  }

  return (
    <CrmEntityListPage
      title="Opportunities"
      description="Opportunity records from consolidated CRM API."
      actionPath="/opportunities"
      createPath="/opportunities/new"
      createLabel="Create opportunity"
      {...(query.search ? { search: query.search } : {})}
      caption="Opportunities"
      columns={columns}
      paged={data}
      detailBasePath="/opportunities"
      currentQuery={currentQuery}
    />
  );
}
