import { CrmEntityFormShell } from "@/components/forms/crm-entity-form-shell";
import { TicketForm } from "@/features/tickets/forms/ticket-form";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { tCrm } from "@/lib/i18n/crm-i18n";

export default async function NewTicketPage() {
  await requireCrmSession("/tickets/new");
  const locale = await getRequestLocale();

  return (
    <CrmEntityFormShell
      title={tCrm("crm.tickets.new.title", locale)}
      description={tCrm("crm.tickets.new.description", locale)}
    >
      <TicketForm mode="create" />
    </CrmEntityFormShell>
  );
}
