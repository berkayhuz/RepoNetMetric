import { CrmEntityListPage } from "@/components/shell/crm-entity-list-page";
import type { CrmEntityTableColumn } from "@/components/shell/crm-entity-table";
import { getTicketsData } from "@/features/tickets/data/tickets-data";
import { toListQuery } from "@/features/shared/data/query";
import type { TicketListItemDto } from "@/lib/crm-api";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

const columns: CrmEntityTableColumn<TicketListItemDto>[] = [
  { key: "ticketNumber", header: "Ticket #", render: (item) => item.ticketNumber },
  { key: "subject", header: "Subject", render: (item) => item.subject },
  { key: "priority", header: "Priority", render: (item) => String(item.priority) },
  { key: "status", header: "Status", render: (item) => String(item.status) },
  {
    key: "openedAt",
    header: "Opened",
    render: (item) => new Date(item.openedAt).toLocaleDateString("en-GB"),
  },
  {
    key: "assignedUserId",
    header: "Assigned user",
    render: (item) => item.assignedUserId || "-",
  },
  { key: "isActive", header: "State", render: (item) => (item.isActive ? "Active" : "Inactive") },
];

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireCrmSession("/tickets");

  const params = await searchParams;
  const query = toListQuery(params);
  const data = await getTicketsData(query, "/tickets");

  const currentQuery = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") currentQuery.set(key, value);
    if (Array.isArray(value) && value[0]) currentQuery.set(key, value[0]);
  }

  return (
    <CrmEntityListPage
      title="Tickets"
      description="Ticket records from consolidated CRM API."
      actionPath="/tickets"
      createPath="/tickets/new"
      createLabel="Create ticket"
      {...(query.search ? { search: query.search } : {})}
      caption="Tickets"
      columns={columns}
      paged={data}
      detailBasePath="/tickets"
      currentQuery={currentQuery}
    />
  );
}
