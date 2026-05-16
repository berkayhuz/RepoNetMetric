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
import { TicketSlaReadFiltersForm } from "@/features/ticket-sla/components/ticket-sla-read-filters-form";
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
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value[0];
  return undefined;
}

function enumLabel(namespace: string, value: string, locale: string): string {
  return tCrmWithFallback(`${namespace}.${value}`, value, locale);
}

export default async function TicketSlaPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const locale = await getRequestLocale();
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
        title={tCrm("crm.ticketSla.page.title", locale)}
        description={tCrm("crm.ticketSla.page.description", locale)}
      />

      <Card>
        <CardHeader>
          <CardTitle>{tCrm("crm.ticketSla.readFilters.title", locale)}</CardTitle>
          <CardDescription>{tCrm("crm.ticketSla.readFilters.description", locale)}</CardDescription>
        </CardHeader>
        <CardContent>
          <TicketSlaReadFiltersForm
            policies={policies}
            policyId={policyId}
            ticketIdValue={ticketId ?? ticketIdRaw ?? ""}
          />
          {ticketIdRaw && !ticketId ? (
            <p className="mt-3 text-sm text-muted-foreground">
              {tCrm("crm.ticketSla.validation.invalidTicketId", locale)}
            </p>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{tCrm("crm.ticketSla.policies.title", locale)}</CardTitle>
          <CardDescription>{tCrm("crm.ticketSla.policies.description", locale)}</CardDescription>
        </CardHeader>
        <CardContent>
          {policies.length === 0 ? (
            <CrmEmptyState
              title={tCrm("crm.ticketSla.policies.emptyTitle", locale)}
              description={tCrm("crm.ticketSla.policies.emptyDescription", locale)}
            />
          ) : (
            <Table>
              <TableCaption>{tCrm("crm.ticketSla.policies.caption", locale)}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>{tCrm("crm.ticketSla.fields.name", locale)}</TableHead>
                  <TableHead>{tCrm("crm.ticketSla.fields.priority", locale)}</TableHead>
                  <TableHead>
                    {tCrm("crm.ticketSla.fields.firstResponseTargetMinutes", locale)}
                  </TableHead>
                  <TableHead>
                    {tCrm("crm.ticketSla.fields.resolutionTargetMinutes", locale)}
                  </TableHead>
                  <TableHead>{tCrm("crm.ticketSla.fields.categoryId", locale)}</TableHead>
                  <TableHead>{tCrm("crm.ticketSla.fields.default", locale)}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {policies.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell>{policy.name}</TableCell>
                    <TableCell>
                      {enumLabel("crm.common.priority", String(policy.priority), locale)}
                    </TableCell>
                    <TableCell>{policy.firstResponseTargetMinutes}</TableCell>
                    <TableCell>{policy.resolutionTargetMinutes}</TableCell>
                    <TableCell>{policy.ticketCategoryId ?? "-"}</TableCell>
                    <TableCell>
                      <Badge variant={policy.isDefault ? "default" : "secondary"}>
                        {policy.isDefault
                          ? tCrm("crm.ticketSla.labels.default", locale)
                          : tCrm("crm.common.boolean.false", locale)}
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
          <CardTitle>{tCrm("crm.ticketSla.rules.title", locale)}</CardTitle>
          <CardDescription>{tCrm("crm.ticketSla.rules.description", locale)}</CardDescription>
        </CardHeader>
        <CardContent>
          {!policyId ? (
            <CrmEmptyState
              title={tCrm("crm.ticketSla.rules.selectPolicyTitle", locale)}
              description={tCrm("crm.ticketSla.rules.selectPolicyDescription", locale)}
            />
          ) : !escalationRules || escalationRules.length === 0 ? (
            <CrmEmptyState
              title={tCrm("crm.ticketSla.rules.emptyTitle", locale)}
              description={tCrm("crm.ticketSla.rules.emptyDescription", locale)}
            />
          ) : (
            <Table>
              <TableCaption>{tCrm("crm.ticketSla.rules.caption", locale)}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>{tCrm("crm.ticketSla.fields.metric", locale)}</TableHead>
                  <TableHead>{tCrm("crm.ticketSla.fields.triggerMinutes", locale)}</TableHead>
                  <TableHead>{tCrm("crm.ticketSla.fields.action", locale)}</TableHead>
                  <TableHead>{tCrm("crm.ticketSla.fields.targetTeam", locale)}</TableHead>
                  <TableHead>{tCrm("crm.ticketSla.fields.targetUser", locale)}</TableHead>
                  <TableHead>{tCrm("crm.ticketSla.fields.enabled", locale)}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {escalationRules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell>
                      {enumLabel("crm.ticketSla.metric", rule.metricType, locale)}
                    </TableCell>
                    <TableCell>{rule.triggerBeforeOrAfterMinutes}</TableCell>
                    <TableCell>
                      {enumLabel("crm.ticketSla.action", rule.actionType, locale)}
                    </TableCell>
                    <TableCell>{rule.targetTeamId ?? "-"}</TableCell>
                    <TableCell>{rule.targetUserId ?? "-"}</TableCell>
                    <TableCell>
                      {rule.isEnabled
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
          <CardTitle>{tCrm("crm.ticketSla.workspace.title", locale)}</CardTitle>
          <CardDescription>{tCrm("crm.ticketSla.workspace.description", locale)}</CardDescription>
        </CardHeader>
        <CardContent>
          {!ticketId ? (
            <CrmEmptyState
              title={tCrm("crm.ticketSla.workspace.selectTicketTitle", locale)}
              description={tCrm("crm.ticketSla.workspace.selectTicketDescription", locale)}
            />
          ) : !workspace ? (
            <CrmEmptyState
              title={tCrm("crm.ticketSla.workspace.emptyTitle", locale)}
              description={tCrm("crm.ticketSla.workspace.emptyDescription", locale)}
            />
          ) : (
            <Table>
              <TableCaption>{tCrm("crm.ticketSla.workspace.caption", locale)}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>{tCrm("crm.ticketSla.fields.policyId", locale)}</TableHead>
                  <TableHead>{tCrm("crm.ticketSla.fields.firstResponseDue", locale)}</TableHead>
                  <TableHead>{tCrm("crm.ticketSla.fields.resolutionDue", locale)}</TableHead>
                  <TableHead>{tCrm("crm.ticketSla.fields.firstRespondedAt", locale)}</TableHead>
                  <TableHead>{tCrm("crm.ticketSla.fields.resolvedAt", locale)}</TableHead>
                  <TableHead>
                    {tCrm("crm.ticketSla.fields.firstResponseBreached", locale)}
                  </TableHead>
                  <TableHead>{tCrm("crm.ticketSla.fields.resolutionBreached", locale)}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{workspace.slaPolicyId}</TableCell>
                  <TableCell>
                    {new Date(workspace.firstResponseDueAtUtc).toLocaleString(locale)}
                  </TableCell>
                  <TableCell>
                    {new Date(workspace.resolutionDueAtUtc).toLocaleString(locale)}
                  </TableCell>
                  <TableCell>
                    {workspace.firstRespondedAtUtc
                      ? new Date(workspace.firstRespondedAtUtc).toLocaleString(locale)
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {workspace.resolvedAtUtc
                      ? new Date(workspace.resolvedAtUtc).toLocaleString(locale)
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {workspace.isFirstResponseBreached
                      ? tCrm("crm.common.boolean.true", locale)
                      : tCrm("crm.common.boolean.false", locale)}
                  </TableCell>
                  <TableCell>
                    {workspace.isResolutionBreached
                      ? tCrm("crm.common.boolean.true", locale)
                      : tCrm("crm.common.boolean.false", locale)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{tCrm("crm.ticketSla.runs.title", locale)}</CardTitle>
          <CardDescription>{tCrm("crm.ticketSla.runs.description", locale)}</CardDescription>
        </CardHeader>
        <CardContent>
          {!ticketId ? (
            <CrmEmptyState
              title={tCrm("crm.ticketSla.runs.selectTicketTitle", locale)}
              description={tCrm("crm.ticketSla.runs.selectTicketDescription", locale)}
            />
          ) : !escalationRuns || escalationRuns.length === 0 ? (
            <CrmEmptyState
              title={tCrm("crm.ticketSla.runs.emptyTitle", locale)}
              description={tCrm("crm.ticketSla.runs.emptyDescription", locale)}
            />
          ) : (
            <Table>
              <TableCaption>{tCrm("crm.ticketSla.runs.caption", locale)}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>{tCrm("crm.ticketSla.fields.executedAt", locale)}</TableHead>
                  <TableHead>{tCrm("crm.ticketSla.fields.metric", locale)}</TableHead>
                  <TableHead>{tCrm("crm.ticketSla.fields.ruleId", locale)}</TableHead>
                  <TableHead>{tCrm("crm.ticketSla.fields.note", locale)}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {escalationRuns.map((run) => (
                  <TableRow key={run.id}>
                    <TableCell>{new Date(run.executedAtUtc).toLocaleString(locale)}</TableCell>
                    <TableCell>
                      {enumLabel("crm.ticketSla.metric", run.metricType, locale)}
                    </TableCell>
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
          <CardTitle>{tCrm("crm.ticketSla.mutations.title", locale)}</CardTitle>
          <CardDescription>{tCrm("crm.ticketSla.mutations.description", locale)}</CardDescription>
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

      <CrmContractPending module={tCrm("crm.ticketSla.contractPending.deleteRule", locale)} />
    </section>
  );
}
