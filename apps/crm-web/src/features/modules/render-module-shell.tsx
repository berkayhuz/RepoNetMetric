import { CrmModuleShell } from "@/components/shell/crm-module-shell";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";

export async function renderCrmModuleShell(path: string) {
  await requireCrmSession(path);
  return <CrmModuleShell path={path} />;
}
