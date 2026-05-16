import { CrmEntityFormShell } from "@/components/forms/crm-entity-form-shell";
import { TaskForm } from "@/features/tasks/forms/task-form";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { tCrm } from "@/lib/i18n/crm-i18n";

export default async function NewTaskPage() {
  await requireCrmSession("/tasks/new");
  const locale = await getRequestLocale();

  return (
    <CrmEntityFormShell
      title={tCrm("crm.tasks.new.title", locale)}
      description={tCrm("crm.tasks.new.description", locale)}
    >
      <TaskForm />
    </CrmEntityFormShell>
  );
}
