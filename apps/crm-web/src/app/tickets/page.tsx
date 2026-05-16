import { CrmEntityListPage } from "@/components/shell/crm-entity-list-page";
import type { CrmEntityTableColumn } from "@/components/shell/crm-entity-table";
import { getTicketsData } from "@/features/tickets/data/tickets-data";
import { toListQuery } from "@/features/shared/data/query";
import type { TicketListItemDto } from "@/lib/crm-api";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { tCrm, tCrmWithFallback } from "@/lib/i18n/crm-i18n";

function getColumns(locale: string): CrmEntityTableColumn<TicketListItemDto>[] {
  return [
    {
      key: "ticketNumber",
      header: tCrm("crm.tickets.fields.ticketNumber", locale),
      render: (item) => item.ticketNumber,
    },
    {
      key: "subject",
      header: tCrm("crm.tickets.fields.subject", locale),
      render: (item) => item.subject,
    },
    {
      key: "priority",
      header: tCrm("crm.tickets.fields.priority", locale),
      render: (item) =>
        tCrmWithFallback(`crm.common.priority.${item.priority}`, String(item.priority), locale),
    },
    {
      key: "status",
      header: tCrm("crm.tickets.fields.status", locale),
      render: (item) =>
        tCrmWithFallback(`crm.tickets.status.${item.status}`, String(item.status), locale),
    },
    {
      key: "openedAt",
      header: tCrm("crm.tickets.fields.opened", locale),
      render: (item) => new Date(item.openedAt).toLocaleDateString(locale),
    },
    {
      key: "assignedUserId",
      header: tCrm("crm.tickets.fields.assignedUser", locale),
      render: (item) => item.assignedUserId || "-",
    },
    {
      key: "isActive",
      header: tCrm("crm.tickets.fields.state", locale),
      render: (item) =>
        item.isActive ? tCrm("crm.states.active", locale) : tCrm("crm.states.inactive", locale),
    },
  ];
}

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireCrmSession("/tickets");
  const locale = await getRequestLocale();

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
      title={tCrm("crm.tickets.title", locale)}
      description={tCrm("crm.tickets.description", locale)}
      actionPath="/tickets"
      createPath="/tickets/new"
      createLabel={tCrm("crm.tickets.actions.create", locale)}
      {...(query.search ? { search: query.search } : {})}
      caption={tCrm("crm.tickets.caption", locale)}
      columns={getColumns(locale)}
      paged={data}
      detailBasePath="/tickets"
      currentQuery={currentQuery}
    />
  );
}
