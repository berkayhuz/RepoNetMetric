import { SessionsReadOnlyPanel } from "@/features/account/components/sessions-read-only-panel";
import { getSessionsAndDevicesForPage } from "@/features/account/data/security-read-data";
import { handleAccountApiPageError } from "@/lib/auth/handle-account-api-page-error";
import { requireAccountSession } from "@/lib/auth/require-account-session";

export default async function SecuritySessionsPage() {
  await requireAccountSession("/security/sessions");

  let data;
  try {
    data = await getSessionsAndDevicesForPage();
  } catch (error) {
    handleAccountApiPageError(error);
  }

  return <SessionsReadOnlyPanel sessions={data.sessions} trustedDevices={data.trustedDevices} />;
}
