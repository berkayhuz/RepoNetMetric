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
import { crmCapabilityAllows } from "@/lib/crm-auth/crm-capabilities";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { formatCrmDateTime } from "@/lib/date-time/crm-date-time";
import { getRequestDateSettings } from "@/lib/i18n/request-date-settings";
import { tCrm, tCrmWithFallback } from "@/lib/i18n/crm-i18n";
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

function enumLabel(namespace: string, value: string, locale: string): string {
  return tCrmWithFallback(`${namespace}.${value}`, value, locale);
}

export default async function TicketWorkflowsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await requireCrmSession("/ticket-workflows");
  const dateSettings = await getRequestDateSettings();
  const locale = dateSettings.locale;
  const canManageTicketWorkflows = crmCapabilityAllows(
    session.capabilities,
    "ticketWorkflow.manage",
  );
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
        title={tCrm("crm.ticketWorkflows.page.title", locale)}
        description={tCrm("crm.ticketWorkflows.page.description", locale)}
      />

      <Card>
        <CardHeader>
          <CardTitle>{tCrm("crm.ticketWorkflows.readFilters.title", locale)}</CardTitle>
          <CardDescription>
            {tCrm("crm.ticketWorkflows.readFilters.description", locale)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form method="get" className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="workflow-ticketId" className="text-sm font-medium">
                {tCrm("crm.ticketWorkflows.fields.ticketIdGuid", locale)}
              </label>
              <Input
                id="workflow-ticketId"
                name="ticketId"
                defaultValue={ticketId ?? ticketIdRaw ?? ""}
              />
            </div>
            <div className="flex items-end">
              <Button type="submit" variant="outline" className="w-full">
                {tCrm("crm.ticketWorkflows.readFilters.load", locale)}
              </Button>
            </div>
          </form>
          {ticketIdRaw && !ticketId ? (
            <p className="mt-3 text-sm text-muted-foreground">
              {tCrm("crm.ticketWorkflows.validation.invalidTicketId", locale)}
            </p>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{tCrm("crm.ticketWorkflows.queues.title", locale)}</CardTitle>
          <CardDescription>
            {tCrm("crm.ticketWorkflows.queues.description", locale)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {queues.length === 0 ? (
            <CrmEmptyState
              title={tCrm("crm.ticketWorkflows.queues.emptyTitle", locale)}
              description={tCrm("crm.ticketWorkflows.queues.emptyDescription", locale)}
            />
          ) : (
            <Table>
              <TableCaption>{tCrm("crm.ticketWorkflows.queues.caption", locale)}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>{tCrm("crm.ticketWorkflows.fields.code", locale)}</TableHead>
                  <TableHead>{tCrm("crm.ticketWorkflows.fields.name", locale)}</TableHead>
                  <TableHead>
                    {tCrm("crm.ticketWorkflows.fields.assignmentStrategy", locale)}
                  </TableHead>
                  <TableHead>{tCrm("crm.ticketWorkflows.fields.default", locale)}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queues.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell>{q.code}</TableCell>
                    <TableCell>{q.name}</TableCell>
                    <TableCell>
                      {enumLabel(
                        "crm.ticketWorkflows.strategy",
                        String(q.assignmentStrategy),
                        locale,
                      )}
                    </TableCell>
                    <TableCell>
                      {q.isDefault
                        ? tCrm("crm.common.boolean.true", locale)
                        : tCrm("crm.common.boolean.false", locale)}
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
          <CardTitle>{tCrm("crm.ticketWorkflows.assignmentHistory.title", locale)}</CardTitle>
          <CardDescription>
            {tCrm("crm.ticketWorkflows.assignmentHistory.description", locale)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!ticketId ? (
            <CrmEmptyState
              title={tCrm("crm.ticketWorkflows.selectTicket.title", locale)}
              description={tCrm("crm.ticketWorkflows.selectTicket.description", locale)}
            />
          ) : !assignments || assignments.length === 0 ? (
            <CrmEmptyState
              title={tCrm("crm.ticketWorkflows.assignmentHistory.emptyTitle", locale)}
              description={tCrm("crm.ticketWorkflows.assignmentHistory.emptyDescription", locale)}
            />
          ) : (
            <Table>
              <TableCaption>
                {tCrm("crm.ticketWorkflows.assignmentHistory.caption", locale)}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>{tCrm("crm.ticketWorkflows.fields.changedAt", locale)}</TableHead>
                  <TableHead>{tCrm("crm.ticketWorkflows.fields.previousQueue", locale)}</TableHead>
                  <TableHead>{tCrm("crm.ticketWorkflows.fields.newQueue", locale)}</TableHead>
                  <TableHead>{tCrm("crm.ticketWorkflows.fields.previousOwner", locale)}</TableHead>
                  <TableHead>{tCrm("crm.ticketWorkflows.fields.newOwner", locale)}</TableHead>
                  <TableHead>{tCrm("crm.ticketWorkflows.fields.reason", locale)}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell>{formatCrmDateTime(a.changedAtUtc, dateSettings)}</TableCell>
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
          <CardTitle>{tCrm("crm.ticketWorkflows.statusHistory.title", locale)}</CardTitle>
          <CardDescription>
            {tCrm("crm.ticketWorkflows.statusHistory.description", locale)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!ticketId ? (
            <CrmEmptyState
              title={tCrm("crm.ticketWorkflows.selectTicket.title", locale)}
              description={tCrm("crm.ticketWorkflows.selectTicket.description", locale)}
            />
          ) : !statusHistory || statusHistory.length === 0 ? (
            <CrmEmptyState
              title={tCrm("crm.ticketWorkflows.statusHistory.emptyTitle", locale)}
              description={tCrm("crm.ticketWorkflows.statusHistory.emptyDescription", locale)}
            />
          ) : (
            <Table>
              <TableCaption>
                {tCrm("crm.ticketWorkflows.statusHistory.caption", locale)}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>{tCrm("crm.ticketWorkflows.fields.changedAt", locale)}</TableHead>
                  <TableHead>{tCrm("crm.ticketWorkflows.fields.previousStatus", locale)}</TableHead>
                  <TableHead>{tCrm("crm.ticketWorkflows.fields.newStatus", locale)}</TableHead>
                  <TableHead>{tCrm("crm.ticketWorkflows.fields.note", locale)}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {statusHistory.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{formatCrmDateTime(s.changedAtUtc, dateSettings)}</TableCell>
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

      {canManageTicketWorkflows ? (
        <Card>
          <CardHeader>
            <CardTitle>{tCrm("crm.ticketWorkflows.mutations.title", locale)}</CardTitle>
            <CardDescription>
              {tCrm("crm.ticketWorkflows.mutations.description", locale)}
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
      ) : null}

      <CrmContractPending module={tCrm("crm.ticketWorkflows.contractPending.batch", locale)} />
    </section>
  );
}
