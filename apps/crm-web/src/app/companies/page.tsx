import { CrmEntityListPage } from "@/components/shell/crm-entity-list-page";
import type { CrmEntityTableColumn } from "@/components/shell/crm-entity-table";
import { getCompaniesData } from "@/features/companies/data/companies-data";
import { toListQuery } from "@/features/shared/data/query";
import type { CompanyListItemDto } from "@/lib/crm-api";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

const columns: CrmEntityTableColumn<CompanyListItemDto>[] = [
  { key: "name", header: "Name", render: (item) => item.name },
  { key: "email", header: "Email", render: (item) => item.email || "-" },
  { key: "phone", header: "Phone", render: (item) => item.phone || "-" },
  { key: "sector", header: "Sector", render: (item) => item.sector || "-" },
  { key: "contactCount", header: "Contacts", render: (item) => item.contactCount },
  { key: "isActive", header: "Status", render: (item) => (item.isActive ? "Active" : "Inactive") },
];

export default async function CompaniesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireCrmSession("/companies");

  const params = await searchParams;
  const query = toListQuery(params);
  const data = await getCompaniesData(query, "/companies");

  const currentQuery = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") currentQuery.set(key, value);
    if (Array.isArray(value) && value[0]) currentQuery.set(key, value[0]);
  }

  return (
    <CrmEntityListPage
      title="Companies"
      description="Read-only company list from CRM API."
      actionPath="/companies"
      createPath="/companies/new"
      createLabel="New company"
      {...(query.search ? { search: query.search } : {})}
      caption="Companies"
      columns={columns}
      paged={data}
      detailBasePath="/companies"
      currentQuery={currentQuery}
    />
  );
}
