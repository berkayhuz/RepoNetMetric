import { ScaffoldPage } from "@/features/account/components/scaffold-page";
import { requireAccountSession } from "@/lib/auth/require-account-session";

export default async function SecuritySessionsPage() {
  await requireAccountSession("/security/sessions");

  return (
    <ScaffoldPage
      title="Security Sessions"
      description="Session and device management scaffold. No session actions are wired in this phase."
    />
  );
}
