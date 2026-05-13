import { ScaffoldPage } from "@/features/account/components/scaffold-page";
import { requireAccountSession } from "@/lib/auth/require-account-session";

export default async function PrivacyPage() {
  await requireAccountSession("/privacy");

  return (
    <ScaffoldPage
      title="Privacy"
      description="Privacy and consent scaffold. Consent history and actions are not wired in this phase."
    />
  );
}
