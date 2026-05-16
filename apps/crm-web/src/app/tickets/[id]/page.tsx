import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@netmetric/ui";

import { CrmDeleteConfirmForm } from "@/components/delete/crm-delete-confirm-form";
import { CrmDeleteZone } from "@/components/delete/crm-delete-zone";
import { CrmContractPending } from "@/components/shell/crm-contract-pending";
import { CrmEntityDetailPanel } from "@/components/shell/crm-entity-detail-panel";
import { CrmPageHeader } from "@/components/shell/crm-page-header";
import { getTicketDetailData } from "@/features/tickets/data/tickets-data";
import { deleteTicketAction } from "@/features/tickets/actions/ticket-mutation-actions";
import { isGuid } from "@/features/shared/data/guid";
import { CrmApiError, type TicketDetailDto } from "@/lib/crm-api";
import { crmCapabilityAllows } from "@/lib/crm-auth/crm-capabilities";
import { handleCrmApiPageError } from "@/lib/crm-auth/handle-crm-api-page-error";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { tCrm, tCrmWithFallback } from "@/lib/i18n/crm-i18n";

export default async function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolved = await params;
  const session = await requireCrmSession(`/tickets/${resolved.id}`);
  const locale = await getRequestLocale();
  const canEdit = crmCapabilityAllows(session.capabilities, "tickets.edit");
  const canDelete = crmCapabilityAllows(session.capabilities, "tickets.delete");

  if (!isGuid(resolved.id)) {
    notFound();
  }

  let ticket: TicketDetailDto;

  try {
    ticket = await getTicketDetailData(resolved.id, `/tickets/${resolved.id}`);
  } catch (error) {
    if (error instanceof CrmApiError && error.kind === "not_found") {
      notFound();
    }

    handleCrmApiPageError(error, `/tickets/${resolved.id}`);
  }

  return (
    <section className="space-y-6">
      <CrmPageHeader
        title={ticket.subject}
        description={tCrm("crm.tickets.detail.description", locale)}
        actions={
          canEdit ? (
            <Button asChild>
              <Link href={`/tickets/${resolved.id}/edit`}>
                {tCrm("crm.tickets.actions.edit", locale)}
              </Link>
            </Button>
          ) : undefined
        }
      />
      <CrmEntityDetailPanel
        title={tCrm("crm.tickets.detail.profileTitle", locale)}
        fields={[
          { label: tCrm("crm.tickets.fields.ticketNumber", locale), value: ticket.ticketNumber },
          { label: tCrm("crm.tickets.fields.subject", locale), value: ticket.subject },
          { label: tCrm("crm.tickets.fields.description", locale), value: ticket.description },
          {
            label: tCrm("crm.tickets.fields.status", locale),
            value: tCrmWithFallback(
              `crm.tickets.status.${ticket.status}`,
              String(ticket.status),
              locale,
            ),
          },
          {
            label: tCrm("crm.tickets.fields.priority", locale),
            value: tCrmWithFallback(
              `crm.common.priority.${ticket.priority}`,
              String(ticket.priority),
              locale,
            ),
          },
          {
            label: tCrm("crm.tickets.fields.type", locale),
            value: tCrmWithFallback(
              `crm.tickets.type.${ticket.ticketType}`,
              String(ticket.ticketType),
              locale,
            ),
          },
          {
            label: tCrm("crm.tickets.fields.channel", locale),
            value: tCrmWithFallback(
              `crm.tickets.channel.${ticket.channel}`,
              String(ticket.channel),
              locale,
            ),
          },
          {
            label: tCrm("crm.tickets.fields.assignedUserId", locale),
            value: ticket.assignedUserId,
          },
          { label: tCrm("crm.tickets.fields.customerId", locale), value: ticket.customerId },
          { label: tCrm("crm.tickets.fields.contactId", locale), value: ticket.contactId },
          { label: tCrm("crm.tickets.fields.openedAt", locale), value: ticket.openedAt },
          { label: tCrm("crm.tickets.fields.closedAt", locale), value: ticket.closedAt },
          {
            label: tCrm("crm.tickets.fields.state", locale),
            value: ticket.isActive
              ? tCrm("crm.states.active", locale)
              : tCrm("crm.states.inactive", locale),
          },
        ]}
      />
      {canDelete ? (
        <CrmDeleteZone
          title={tCrm("crm.tickets.delete.title", locale)}
          description={tCrm("crm.tickets.delete.description", locale)}
        >
          <CrmDeleteConfirmForm
            entityLabel={tCrm("crm.tickets.entityLabel", locale)}
            entityName={ticket.subject}
            confirmValue="delete-ticket"
            action={deleteTicketAction.bind(null, resolved.id)}
          />
        </CrmDeleteZone>
      ) : null}
      <CrmContractPending module={tCrm("crm.tickets.contractPending.detailViews", locale)} />
    </section>
  );
}
