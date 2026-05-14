import { CrmContractPending } from "@/components/shell/crm-contract-pending";
import { CrmEmptyState } from "@/components/shell/crm-empty-state";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { CrmPagination } from "@/components/shell/crm-pagination";
import { getSupportInboxData } from "@/features/support-inbox/data/support-inbox-data";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  NativeSelect,
  NativeSelectOption,
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
        title="Support Inbox"
        description="Read-only support inbox connections and messages from consolidated CRM API."
      />

      <Card>
        <CardHeader>
          <CardTitle>Connections</CardTitle>
          <CardDescription>Configured inbox connections (read-only).</CardDescription>
        </CardHeader>
        <CardContent>
          {connections.length === 0 ? (
            <CrmEmptyState
              title="No connections found"
              description="No support inbox connections are currently available."
            />
          ) : (
            <Table>
              <TableCaption>Support inbox connections</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Host</TableHead>
                  <TableHead>Port</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>SSL</TableHead>
                  <TableHead>State</TableHead>
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
                    <TableCell>{connection.useSsl ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      <Badge variant={connection.isActive ? "default" : "secondary"}>
                        {connection.isActive ? "Active" : "Inactive"}
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
          <CardTitle>Messages</CardTitle>
          <CardDescription>Inbound support inbox message stream (read-only).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form method="get" className="grid gap-3 sm:grid-cols-4">
            <div className="space-y-2">
              <label htmlFor="support-inbox-connectionId" className="text-sm font-medium">
                Connection
              </label>
              <NativeSelect
                id="support-inbox-connectionId"
                name="connectionId"
                defaultValue={connectionId ?? ""}
              >
                <NativeSelectOption value="">All connections</NativeSelectOption>
                {connections.map((connection) => (
                  <NativeSelectOption key={connection.id} value={connection.id}>
                    {connection.name}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
            <div className="space-y-2">
              <label htmlFor="support-inbox-linkedToTicket" className="text-sm font-medium">
                Ticket link
              </label>
              <NativeSelect
                id="support-inbox-linkedToTicket"
                name="linkedToTicket"
                defaultValue={linkedToTicketValue ?? ""}
              >
                <NativeSelectOption value="">All</NativeSelectOption>
                <NativeSelectOption value="true">Linked</NativeSelectOption>
                <NativeSelectOption value="false">Not linked</NativeSelectOption>
              </NativeSelect>
            </div>
            <div className="space-y-2">
              <label htmlFor="support-inbox-pageSize" className="text-sm font-medium">
                Page size
              </label>
              <NativeSelect
                id="support-inbox-pageSize"
                name="pageSize"
                defaultValue={String(pageSize)}
              >
                <NativeSelectOption value="10">10</NativeSelectOption>
                <NativeSelectOption value="20">20</NativeSelectOption>
                <NativeSelectOption value="50">50</NativeSelectOption>
              </NativeSelect>
            </div>
            <div className="flex items-end">
              <Button type="submit" variant="outline" className="w-full">
                Apply filters
              </Button>
            </div>
          </form>

          {messages.items.length === 0 ? (
            <CrmEmptyState
              title="No messages found"
              description="No support inbox messages match the current filters."
            />
          ) : (
            <Table>
              <TableCaption>Support inbox messages</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Received</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ticket</TableHead>
                  <TableHead>Connection</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.items.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell>{new Date(message.receivedAtUtc).toLocaleString("en-GB")}</TableCell>
                    <TableCell>{message.fromAddress}</TableCell>
                    <TableCell>{message.subject}</TableCell>
                    <TableCell>{message.status}</TableCell>
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

      <CrmContractPending module="Support inbox sync, connect, send, reply, and delete operations" />
    </section>
  );
}
