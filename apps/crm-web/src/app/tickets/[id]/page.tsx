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
import { handleCrmApiPageError } from "@/lib/crm-auth/handle-crm-api-page-error";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolved = await params;
  await requireCrmSession(`/tickets/${resolved.id}`);

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
        description="Ticket detail."
        actions={
          <Button asChild>
            <Link href={`/tickets/${resolved.id}/edit`}>Edit ticket</Link>
          </Button>
        }
      />
      <CrmEntityDetailPanel
        title="Ticket profile"
        fields={[
          { label: "Ticket #", value: ticket.ticketNumber },
          { label: "Subject", value: ticket.subject },
          { label: "Description", value: ticket.description },
          { label: "Status", value: String(ticket.status) },
          { label: "Priority", value: String(ticket.priority) },
          { label: "Type", value: String(ticket.ticketType) },
          { label: "Channel", value: String(ticket.channel) },
          { label: "Assigned user id", value: ticket.assignedUserId },
          { label: "Customer id", value: ticket.customerId },
          { label: "Contact id", value: ticket.contactId },
          { label: "Opened at", value: ticket.openedAt },
          { label: "Closed at", value: ticket.closedAt },
          { label: "State", value: ticket.isActive ? "Active" : "Inactive" },
        ]}
      />
      <CrmDeleteZone
        title="Delete Ticket"
        description="Deleting this ticket removes it from active CRM views."
      >
        <CrmDeleteConfirmForm
          entityLabel="Ticket"
          entityName={ticket.subject}
          confirmValue="delete-ticket"
          action={deleteTicketAction.bind(null, resolved.id)}
        />
      </CrmDeleteZone>
      <CrmContractPending module="Ticket comments, timeline, SLA, and workflow read views" />
    </section>
  );
}
