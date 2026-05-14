import { CrmEntityFormShell } from "@/components/forms/crm-entity-form-shell";
import { MeetingForm } from "@/features/tasks/forms/meeting-form";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function NewMeetingPage() {
  await requireCrmSession("/tasks/meetings/new");

  return (
    <CrmEntityFormShell
      title="Schedule Meeting"
      description="Schedule a meeting through Work Management."
    >
      <MeetingForm />
    </CrmEntityFormShell>
  );
}
