import { CrmContractPending } from "@/components/shell/crm-contract-pending";
import { CrmEmptyState } from "@/components/shell/crm-empty-state";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { isGuid } from "@/features/shared/data/guid";
import { getTicketSlaData } from "@/features/ticket-sla/data/ticket-sla-data";
import {
  createTicketSlaEscalationRuleAction,
  createTicketSlaPolicyAction,
  deleteTicketSlaPolicyAction,
  updateTicketSlaEscalationRuleAction,
  updateTicketSlaPolicyAction,
} from "@/features/ticket-sla/actions/ticket-sla-mutation-actions";
import { TicketSlaMutationPanels } from "@/features/ticket-sla/forms/ticket-sla-mutation-panels";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
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
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value[0];
  return undefined;
}

export default async function TicketSlaPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const policyIdRaw = toSingleValue(params.policyId);
  const ticketIdRaw = toSingleValue(params.ticketId);
  const policyId = policyIdRaw && isGuid(policyIdRaw) ? policyIdRaw : undefined;
  const ticketId = ticketIdRaw && isGuid(ticketIdRaw) ? ticketIdRaw : undefined;

  const { policies, escalationRules, workspace, escalationRuns } = await getTicketSlaData(
    {
      ...(policyId ? { policyId } : {}),
      ...(ticketId ? { ticketId } : {}),
    },
    "/ticket-sla",
  );

  return (
    <section className="space-y-6">
      <CrmPageHeader
        title="Ticket SLA"
        description="Read-only SLA policies and ticket SLA execution views from consolidated CRM API."
      />

      <Card>
        <CardHeader>
          <CardTitle>Read Filters</CardTitle>
          <CardDescription>
            Select a policy for escalation rules and optionally provide a ticket id for workspace
            and escalation runs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form method="get" className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="ticket-sla-policyId" className="text-sm font-medium">
                Policy
              </label>
              <NativeSelect id="ticket-sla-policyId" name="policyId" defaultValue={policyId ?? ""}>
                <NativeSelectOption value="">No policy selected</NativeSelectOption>
                {policies.map((policy) => (
                  <NativeSelectOption key={policy.id} value={policy.id}>
                    {policy.name}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
            <div className="space-y-2">
              <label htmlFor="ticket-sla-ticketId" className="text-sm font-medium">
                Ticket ID (GUID)
              </label>
              <Input
                id="ticket-sla-ticketId"
                name="ticketId"
                defaultValue={ticketId ?? ticketIdRaw ?? ""}
              />
            </div>
            <div className="flex items-end">
              <Button type="submit" variant="outline" className="w-full">
                Load read views
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
          <CardTitle>SLA Policies</CardTitle>
          <CardDescription>Configured ticket SLA policies (read-only).</CardDescription>
        </CardHeader>
        <CardContent>
          {policies.length === 0 ? (
            <CrmEmptyState
              title="No SLA policies found"
              description="No ticket SLA policies are currently available."
            />
          ) : (
            <Table>
              <TableCaption>Ticket SLA policies</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>First response (min)</TableHead>
                  <TableHead>Resolution (min)</TableHead>
                  <TableHead>Category ID</TableHead>
                  <TableHead>Default</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {policies.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell>{policy.name}</TableCell>
                    <TableCell>{policy.priority}</TableCell>
                    <TableCell>{policy.firstResponseTargetMinutes}</TableCell>
                    <TableCell>{policy.resolutionTargetMinutes}</TableCell>
                    <TableCell>{policy.ticketCategoryId ?? "-"}</TableCell>
                    <TableCell>
                      <Badge variant={policy.isDefault ? "default" : "secondary"}>
                        {policy.isDefault ? "Default" : "No"}
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
          <CardTitle>Escalation Rules</CardTitle>
          <CardDescription>Read-only rules for the selected SLA policy.</CardDescription>
        </CardHeader>
        <CardContent>
          {!policyId ? (
            <CrmEmptyState
              title="Select a policy"
              description="Choose an SLA policy above to load escalation rules."
            />
          ) : !escalationRules || escalationRules.length === 0 ? (
            <CrmEmptyState
              title="No escalation rules found"
              description="No escalation rules are configured for the selected policy."
            />
          ) : (
            <Table>
              <TableCaption>Escalation rules</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>Trigger (min)</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Target team</TableHead>
                  <TableHead>Target user</TableHead>
                  <TableHead>Enabled</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {escalationRules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell>{rule.metricType}</TableCell>
                    <TableCell>{rule.triggerBeforeOrAfterMinutes}</TableCell>
                    <TableCell>{rule.actionType}</TableCell>
                    <TableCell>{rule.targetTeamId ?? "-"}</TableCell>
                    <TableCell>{rule.targetUserId ?? "-"}</TableCell>
                    <TableCell>{rule.isEnabled ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ticket SLA Workspace</CardTitle>
          <CardDescription>Read-only SLA state for the selected ticket.</CardDescription>
        </CardHeader>
        <CardContent>
          {!ticketId ? (
            <CrmEmptyState
              title="Select a ticket"
              description="Enter a valid ticket GUID above to load SLA workspace and escalation runs."
            />
          ) : !workspace ? (
            <CrmEmptyState
              title="No workspace data found"
              description="The selected ticket has no SLA workspace data."
            />
          ) : (
            <Table>
              <TableCaption>Ticket SLA workspace</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Policy ID</TableHead>
                  <TableHead>First response due</TableHead>
                  <TableHead>Resolution due</TableHead>
                  <TableHead>First responded at</TableHead>
                  <TableHead>Resolved at</TableHead>
                  <TableHead>First response breached</TableHead>
                  <TableHead>Resolution breached</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{workspace.slaPolicyId}</TableCell>
                  <TableCell>
                    {new Date(workspace.firstResponseDueAtUtc).toLocaleString("en-GB")}
                  </TableCell>
                  <TableCell>
                    {new Date(workspace.resolutionDueAtUtc).toLocaleString("en-GB")}
                  </TableCell>
                  <TableCell>
                    {workspace.firstRespondedAtUtc
                      ? new Date(workspace.firstRespondedAtUtc).toLocaleString("en-GB")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {workspace.resolvedAtUtc
                      ? new Date(workspace.resolvedAtUtc).toLocaleString("en-GB")
                      : "-"}
                  </TableCell>
                  <TableCell>{workspace.isFirstResponseBreached ? "Yes" : "No"}</TableCell>
                  <TableCell>{workspace.isResolutionBreached ? "Yes" : "No"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Escalation Runs</CardTitle>
          <CardDescription>
            Read-only escalation execution history for the selected ticket.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!ticketId ? (
            <CrmEmptyState
              title="Select a ticket"
              description="Enter a valid ticket GUID above to load escalation runs."
            />
          ) : !escalationRuns || escalationRuns.length === 0 ? (
            <CrmEmptyState
              title="No escalation runs found"
              description="No escalation runs are available for the selected ticket."
            />
          ) : (
            <Table>
              <TableCaption>Ticket escalation runs</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Executed at</TableHead>
                  <TableHead>Metric</TableHead>
                  <TableHead>Rule ID</TableHead>
                  <TableHead>Note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {escalationRuns.map((run) => (
                  <TableRow key={run.id}>
                    <TableCell>{new Date(run.executedAtUtc).toLocaleString("en-GB")}</TableCell>
                    <TableCell>{run.metricType}</TableCell>
                    <TableCell>{run.escalationRuleId}</TableCell>
                    <TableCell>{run.note}</TableCell>
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
            Safe mutation flows implemented from source-visible contracts. Escalation rule delete is
            not available in the backend route surface yet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TicketSlaMutationPanels
            createPolicyAction={createTicketSlaPolicyAction}
            updatePolicyAction={updateTicketSlaPolicyAction}
            deletePolicyAction={deleteTicketSlaPolicyAction}
            createRuleAction={createTicketSlaEscalationRuleAction}
            updateRuleAction={updateTicketSlaEscalationRuleAction}
          />
        </CardContent>
      </Card>

      <CrmContractPending module="Ticket SLA escalation rule delete mutation route" />
    </section>
  );
}
