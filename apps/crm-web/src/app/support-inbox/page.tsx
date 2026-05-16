import { CrmContractPending } from "@/components/shell/crm-contract-pending";
import { CrmEmptyState } from "@/components/shell/crm-empty-state";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { CrmPagination } from "@/components/shell/crm-pagination";
import { getSupportInboxData } from "@/features/support-inbox/data/support-inbox-data";
import { SupportInboxFilterForm } from "@/features/support-inbox/components/support-inbox-filter-form";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { tCrm, tCrmWithFallback } from "@/lib/i18n/crm-i18n";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@netmetric/ui";

function toSingleValue(value: string | string[] | undefined): string | undefined {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value[0];
  }

  return undefined;
}

function toPositiveInt(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export default async function SupportInboxPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const locale = await getRequestLocale();
  const params = await searchParams;
  const connectionId = toSingleValue(params.connectionId);
  const linkedToTicketValue = toSingleValue(params.linkedToTicket);
  const linkedToTicket =
    linkedToTicketValue === "true" ? true : linkedToTicketValue === "false" ? false : undefined;
  const page = toPositiveInt(toSingleValue(params.page), 1);
  const pageSize = toPositiveInt(toSingleValue(params.pageSize), 20);

  const { connections, messages } = await getSupportInboxData(
    {
      ...(connectionId ? { connectionId } : {}),
      ...(linkedToTicket !== undefined ? { linkedToTicket } : {}),
      page,
      pageSize,
    },
    "/support-inbox",
  );

  const currentQuery = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") currentQuery.set(key, value);
    if (Array.isArray(value) && value[0]) currentQuery.set(key, value[0]);
  }

  return (
    <section className="space-y-6">
      <CrmPageHeader
        title={tCrm("crm.supportInbox.page.title", locale)}
        description={tCrm("crm.supportInbox.page.description", locale)}
      />

      <Card>
        <CardHeader>
          <CardTitle>{tCrm("crm.supportInbox.connections.title", locale)}</CardTitle>
          <CardDescription>
            {tCrm("crm.supportInbox.connections.description", locale)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {connections.length === 0 ? (
            <CrmEmptyState
              title={tCrm("crm.supportInbox.connections.emptyTitle", locale)}
              description={tCrm("crm.supportInbox.connections.emptyDescription", locale)}
            />
          ) : (
            <Table>
              <TableCaption>{tCrm("crm.supportInbox.connections.caption", locale)}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>{tCrm("crm.supportInbox.fields.name", locale)}</TableHead>
                  <TableHead>{tCrm("crm.supportInbox.fields.provider", locale)}</TableHead>
                  <TableHead>{tCrm("crm.supportInbox.fields.email", locale)}</TableHead>
                  <TableHead>{tCrm("crm.supportInbox.fields.host", locale)}</TableHead>
                  <TableHead>{tCrm("crm.supportInbox.fields.port", locale)}</TableHead>
                  <TableHead>{tCrm("crm.supportInbox.fields.username", locale)}</TableHead>
                  <TableHead>{tCrm("crm.supportInbox.fields.ssl", locale)}</TableHead>
                  <TableHead>{tCrm("crm.supportInbox.fields.state", locale)}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {connections.map((connection) => (
                  <TableRow key={connection.id}>
                    <TableCell>{connection.name}</TableCell>
                    <TableCell>{connection.provider}</TableCell>
                    <TableCell>{connection.emailAddress}</TableCell>
                    <TableCell>{connection.host}</TableCell>
                    <TableCell>{connection.port}</TableCell>
                    <TableCell>{connection.username}</TableCell>
                    <TableCell>
                      {connection.useSsl
                        ? tCrm("crm.common.boolean.true", locale)
                        : tCrm("crm.common.boolean.false", locale)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={connection.isActive ? "default" : "secondary"}>
                        {connection.isActive
                          ? tCrm("crm.supportInbox.state.active", locale)
                          : tCrm("crm.supportInbox.state.inactive", locale)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{tCrm("crm.supportInbox.messages.title", locale)}</CardTitle>
          <CardDescription>{tCrm("crm.supportInbox.messages.description", locale)}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SupportInboxFilterForm
            connections={connections}
            connectionId={connectionId}
            linkedToTicketValue={linkedToTicketValue}
            pageSize={pageSize}
          />

          {messages.items.length === 0 ? (
            <CrmEmptyState
              title={tCrm("crm.supportInbox.messages.emptyTitle", locale)}
              description={tCrm("crm.supportInbox.messages.emptyDescription", locale)}
            />
          ) : (
            <Table>
              <TableCaption>{tCrm("crm.supportInbox.messages.caption", locale)}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>{tCrm("crm.supportInbox.fields.received", locale)}</TableHead>
                  <TableHead>{tCrm("crm.supportInbox.fields.from", locale)}</TableHead>
                  <TableHead>{tCrm("crm.supportInbox.fields.subject", locale)}</TableHead>
                  <TableHead>{tCrm("crm.supportInbox.fields.status", locale)}</TableHead>
                  <TableHead>{tCrm("crm.supportInbox.fields.ticket", locale)}</TableHead>
                  <TableHead>{tCrm("crm.supportInbox.fields.connection", locale)}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.items.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell>{new Date(message.receivedAtUtc).toLocaleString(locale)}</TableCell>
                    <TableCell>{message.fromAddress}</TableCell>
                    <TableCell>{message.subject}</TableCell>
                    <TableCell>
                      {tCrmWithFallback(
                        `crm.supportInbox.status.${message.status}`,
                        message.status,
                        locale,
                      )}
                    </TableCell>
                    <TableCell>{message.ticketId ?? "-"}</TableCell>
                    <TableCell>{message.connectionId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          <CrmPagination
            currentPage={messages.pageNumber}
            totalPages={messages.totalPages}
            basePath="/support-inbox"
            currentQuery={currentQuery}
          />
        </CardContent>
      </Card>

      <CrmContractPending module={tCrm("crm.supportInbox.contractPending.operations", locale)} />
    </section>
  );
}
