import { CrmEntityListPage } from "@/components/shell/crm-entity-list-page";
import type { CrmEntityTableColumn } from "@/components/shell/crm-entity-table";
import { getCustomersData } from "@/features/customers/data/customers-data";
import { toListQuery } from "@/features/shared/data/query";
import type { CustomerListItemDto } from "@/lib/crm-api";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

const columns: CrmEntityTableColumn<CustomerListItemDto>[] = [
  { key: "fullName", header: "Name", render: (item) => item.fullName },
  { key: "email", header: "Email", render: (item) => item.email || "-" },
  { key: "mobilePhone", header: "Mobile", render: (item) => item.mobilePhone || "-" },
  { key: "companyName", header: "Company", render: (item) => item.companyName || "-" },
  { key: "isVip", header: "VIP", render: (item) => (item.isVip ? "Yes" : "No") },
  { key: "isActive", header: "Status", render: (item) => (item.isActive ? "Active" : "Inactive") },
];

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireCrmSession("/customers");

  const params = await searchParams;
  const query = toListQuery(params);
  const data = await getCustomersData(query, "/customers");

  const currentQuery = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") currentQuery.set(key, value);
    if (Array.isArray(value) && value[0]) currentQuery.set(key, value[0]);
  }

  return (
    <CrmEntityListPage
      title="Customers"
      description="Read-only customer list from CRM API."
      actionPath="/customers"
      {...(query.search ? { search: query.search } : {})}
      caption="Customers"
      columns={columns}
      paged={data}
      detailBasePath="/customers"
      currentQuery={currentQuery}
    />
  );
}
