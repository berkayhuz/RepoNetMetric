import { CrmEntityFormShell } from "@/components/forms/crm-entity-form-shell";
import { TicketForm } from "@/features/tickets/forms/ticket-form";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function NewTicketPage() {
  await requireCrmSession("/tickets/new");

  return (
    <CrmEntityFormShell title="Create Ticket" description="Add a new ticket record.">
      <TicketForm mode="create" />
    </CrmEntityFormShell>
  );
}
