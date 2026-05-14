import { CrmEntityListPage } from "@/components/shell/crm-entity-list-page";
import type { CrmEntityTableColumn } from "@/components/shell/crm-entity-table";
import { getQuotesData } from "@/features/quotes/data/quotes-data";
import { toListQuery } from "@/features/shared/data/query";
import type { QuoteListItemDto } from "@/lib/crm-api";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

const columns: CrmEntityTableColumn<QuoteListItemDto>[] = [
  { key: "quoteNumber", header: "Quote number", render: (item) => item.quoteNumber },
  { key: "proposalTitle", header: "Proposal title", render: (item) => item.proposalTitle || "-" },
  { key: "status", header: "Status", render: (item) => String(item.status) },
  {
    key: "quoteDate",
    header: "Quote date",
    render: (item) => new Date(item.quoteDate).toLocaleDateString("en-GB"),
  },
  {
    key: "validUntil",
    header: "Valid until",
    render: (item) =>
      item.validUntil ? new Date(item.validUntil).toLocaleDateString("en-GB") : "-",
  },
  { key: "currencyCode", header: "Currency", render: (item) => item.currencyCode },
  { key: "grandTotal", header: "Grand total", render: (item) => item.grandTotal ?? "-" },
  {
    key: "isActive",
    header: "State",
    render: (item) => (item.isActive ? "Active" : "Inactive"),
  },
];

export default async function QuotesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireCrmSession("/quotes");

  const params = await searchParams;
  const query = toListQuery(params);
  const data = await getQuotesData(query, "/quotes");

  const currentQuery = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") currentQuery.set(key, value);
    if (Array.isArray(value) && value[0]) currentQuery.set(key, value[0]);
  }

  return (
    <CrmEntityListPage
      title="Quotes"
      description="Quote records from consolidated CRM API."
      actionPath="/quotes"
      createPath="/quotes/new"
      createLabel="Create quote"
      {...(query.search ? { search: query.search } : {})}
      caption="Quotes"
      columns={columns}
      paged={data}
      detailBasePath="/quotes"
      currentQuery={currentQuery}
    />
  );
}
