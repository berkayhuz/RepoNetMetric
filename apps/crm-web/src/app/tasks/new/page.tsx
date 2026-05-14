import { CrmEntityFormShell } from "@/components/forms/crm-entity-form-shell";
import { TaskForm } from "@/features/tasks/forms/task-form";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export default async function NewTaskPage() {
  await requireCrmSession("/tasks/new");

  return (
    <CrmEntityFormShell title="Create Task" description="Create a new task in Work Management.">
      <TaskForm />
    </CrmEntityFormShell>
  );
}
