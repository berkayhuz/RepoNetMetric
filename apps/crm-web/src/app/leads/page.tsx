import { CrmEntityListPage } from "@/components/shell/crm-entity-list-page";
import type { CrmEntityTableColumn } from "@/components/shell/crm-entity-table";
import { getLeadsData } from "@/features/leads/data/leads-data";
import { toListQuery } from "@/features/shared/data/query";
import type { LeadListItemDto } from "@/lib/crm-api";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

const columns: CrmEntityTableColumn<LeadListItemDto>[] = [
  { key: "leadCode", header: "Code", render: (item) => item.leadCode },
  { key: "fullName", header: "Name", render: (item) => item.fullName },
  { key: "companyName", header: "Company", render: (item) => item.companyName || "-" },
  { key: "email", header: "Email", render: (item) => item.email || "-" },
  { key: "status", header: "Status", render: (item) => String(item.status) },
  { key: "source", header: "Source", render: (item) => String(item.source) },
  {
    key: "nextContactDate",
    header: "Next contact",
    render: (item) =>
      item.nextContactDate ? new Date(item.nextContactDate).toLocaleDateString("en-GB") : "-",
  },
  {
    key: "isActive",
    header: "State",
    render: (item) => (item.isActive ? "Active" : "Inactive"),
  },
];

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireCrmSession("/leads");

  const params = await searchParams;
  const query = toListQuery(params);
  const data = await getLeadsData(query, "/leads");

  const currentQuery = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") currentQuery.set(key, value);
    if (Array.isArray(value) && value[0]) currentQuery.set(key, value[0]);
  }

  return (
    <CrmEntityListPage
      title="Leads"
      description="Lead records from consolidated CRM API."
      actionPath="/leads"
      createPath="/leads/new"
      createLabel="Create lead"
      {...(query.search ? { search: query.search } : {})}
      caption="Leads"
      columns={columns}
      paged={data}
      detailBasePath="/leads"
      currentQuery={currentQuery}
    />
  );
}
