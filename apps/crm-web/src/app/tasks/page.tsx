import { renderCrmModuleShell } from "@/features/modules/render-module-shell";

export default async function TasksPage() {
  return renderCrmModuleShell("/tasks");
}
