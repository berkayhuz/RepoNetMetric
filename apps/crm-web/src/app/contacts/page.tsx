import { CrmEntityListPage } from "@/components/shell/crm-entity-list-page";
import type { CrmEntityTableColumn } from "@/components/shell/crm-entity-table";
import { getContactsData } from "@/features/contacts/data/contacts-data";
import { toListQuery } from "@/features/shared/data/query";
import type { ContactListItemDto } from "@/lib/crm-api";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

const columns: CrmEntityTableColumn<ContactListItemDto>[] = [
  { key: "fullName", header: "Name", render: (item) => item.fullName },
  { key: "email", header: "Email", render: (item) => item.email || "-" },
  { key: "mobilePhone", header: "Mobile", render: (item) => item.mobilePhone || "-" },
  { key: "companyName", header: "Company", render: (item) => item.companyName || "-" },
  { key: "customerName", header: "Customer", render: (item) => item.customerName || "-" },
  {
    key: "isPrimaryContact",
    header: "Primary",
    render: (item) => (item.isPrimaryContact ? "Yes" : "No"),
  },
];

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireCrmSession("/contacts");

  const params = await searchParams;
  const query = toListQuery(params);
  const data = await getContactsData(query, "/contacts");

  const currentQuery = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") currentQuery.set(key, value);
    if (Array.isArray(value) && value[0]) currentQuery.set(key, value[0]);
  }

  return (
    <CrmEntityListPage
      title="Contacts"
      description="Read-only contact list from CRM API."
      actionPath="/contacts"
      {...(query.search ? { search: query.search } : {})}
      caption="Contacts"
      columns={columns}
      paged={data}
      detailBasePath="/contacts"
      currentQuery={currentQuery}
    />
  );
}
