import { CrmEntityFormShell } from "@/components/forms/crm-entity-form-shell";
import { MeetingForm } from "@/features/tasks/forms/meeting-form";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { tCrm } from "@/lib/i18n/crm-i18n";

export default async function NewMeetingPage() {
  await requireCrmSession("/tasks/meetings/new");
  const locale = await getRequestLocale();

  return (
    <CrmEntityFormShell
      title={tCrm("crm.meetings.new.title", locale)}
      description={tCrm("crm.meetings.new.description", locale)}
    >
      <MeetingForm />
    </CrmEntityFormShell>
  );
}
