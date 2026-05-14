import { CrmContractPending } from "@/components/shell/crm-contract-pending";
import { CrmEmptyState } from "@/components/shell/crm-empty-state";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { isGuid } from "@/features/shared/data/guid";
import {
  assignTicketWorkflowOwnerAction,
  assignTicketWorkflowQueueAction,
  changeTicketWorkflowStatusAction,
  createTicketWorkflowQueueAction,
  deleteTicketWorkflowQueueAction,
  updateTicketWorkflowQueueAction,
} from "@/features/ticket-workflows/actions/ticket-workflow-mutation-actions";
import { getTicketWorkflowData } from "@/features/ticket-workflows/data/ticket-workflow-data";
import { TicketWorkflowMutationPanels } from "@/features/ticket-workflows/forms/ticket-workflow-mutation-panels";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@netmetric/ui";

function toSingleValue(value: string | string[] | undefined): string | undefined {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value[0];
  return undefined;
}

export default async function TicketWorkflowsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const ticketIdRaw = toSingleValue(params.ticketId);
  const ticketId = ticketIdRaw && isGuid(ticketIdRaw) ? ticketIdRaw : undefined;

  const { queues, assignments, statusHistory } = await getTicketWorkflowData(
    {
      ...(ticketId ? { ticketId } : {}),
    },
    "/ticket-workflows",
  );

  return (
    <section className="space-y-6">
      <CrmPageHeader
        title="Ticket Workflows"
        description="Queue management and ticket workflow assignment/status actions from consolidated CRM API."
      />

      <Card>
        <CardHeader>
          <CardTitle>Read Filters</CardTitle>
          <CardDescription>
            Enter a ticket id to load assignment and status history views.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form method="get" className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="workflow-ticketId" className="text-sm font-medium">
                Ticket ID (GUID)
              </label>
              <Input
                id="workflow-ticketId"
                name="ticketId"
                defaultValue={ticketId ?? ticketIdRaw ?? ""}
              />
            </div>
            <div className="flex items-end">
              <Button type="submit" variant="outline" className="w-full">
                Load ticket history
              </Button>
            </div>
          </form>
          {ticketIdRaw && !ticketId ? (
            <p className="mt-3 text-sm text-muted-foreground">Ticket ID is not a valid GUID.</p>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Queues</CardTitle>
          <CardDescription>Current workflow queues.</CardDescription>
        </CardHeader>
        <CardContent>
          {queues.length === 0 ? (
            <CrmEmptyState
              title="No queues found"
              description="No workflow queues are configured."
            />
          ) : (
            <Table>
              <TableCaption>Workflow queues</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Strategy</TableHead>
                  <TableHead>Default</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queues.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell>{q.code}</TableCell>
                    <TableCell>{q.name}</TableCell>
                    <TableCell>{q.assignmentStrategy}</TableCell>
                    <TableCell>{q.isDefault ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assignment History</CardTitle>
          <CardDescription>Read-only history for selected ticket.</CardDescription>
        </CardHeader>
        <CardContent>
          {!ticketId ? (
            <CrmEmptyState title="Select a ticket" description="Enter a valid ticket GUID above." />
          ) : !assignments || assignments.length === 0 ? (
            <CrmEmptyState
              title="No assignment history"
              description="No assignment records found for this ticket."
            />
          ) : (
            <Table>
              <TableCaption>Ticket assignments</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Changed At</TableHead>
                  <TableHead>Previous Queue</TableHead>
                  <TableHead>New Queue</TableHead>
                  <TableHead>Previous Owner</TableHead>
                  <TableHead>New Owner</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell>{new Date(a.changedAtUtc).toLocaleString("en-GB")}</TableCell>
                    <TableCell>{a.previousQueueId ?? "-"}</TableCell>
                    <TableCell>{a.newQueueId ?? "-"}</TableCell>
                    <TableCell>{a.previousOwnerUserId ?? "-"}</TableCell>
                    <TableCell>{a.newOwnerUserId ?? "-"}</TableCell>
                    <TableCell>{a.reason ?? "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status History</CardTitle>
          <CardDescription>Read-only status transitions for selected ticket.</CardDescription>
        </CardHeader>
        <CardContent>
          {!ticketId ? (
            <CrmEmptyState title="Select a ticket" description="Enter a valid ticket GUID above." />
          ) : !statusHistory || statusHistory.length === 0 ? (
            <CrmEmptyState
              title="No status history"
              description="No status transitions found for this ticket."
            />
          ) : (
            <Table>
              <TableCaption>Ticket status transitions</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Changed At</TableHead>
                  <TableHead>Previous Status</TableHead>
                  <TableHead>New Status</TableHead>
                  <TableHead>Note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {statusHistory.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{new Date(s.changedAtUtc).toLocaleString("en-GB")}</TableCell>
                    <TableCell>{s.previousStatus}</TableCell>
                    <TableCell>{s.newStatus}</TableCell>
                    <TableCell>{s.note ?? "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mutation Actions</CardTitle>
          <CardDescription>
            Queue CRUD and ticket-specific workflow transitions from source-visible contracts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TicketWorkflowMutationPanels
            createQueueAction={createTicketWorkflowQueueAction}
            updateQueueAction={updateTicketWorkflowQueueAction}
            deleteQueueAction={deleteTicketWorkflowQueueAction}
            assignQueueAction={assignTicketWorkflowQueueAction}
            assignOwnerAction={assignTicketWorkflowOwnerAction}
            statusChangeAction={changeTicketWorkflowStatusAction}
          />
        </CardContent>
      </Card>

      <CrmContractPending module="workflow batch/destructive operations and guided transition lookups" />
    </section>
  );
}
