import { CrmModuleShell } from "@/components/shell/crm-module-shell";
import { requireCrmSession } from "@/lib/crm-auth/require-crm-session";
import { getRequestLocale } from "@/lib/i18n/request-locale";

export async function renderCrmModuleShell(path: string) {
  await requireCrmSession(path);
  const locale = await getRequestLocale();
  return <CrmModuleShell path={path} locale={locale} />;
}
