import { ScaffoldPage } from "@/features/account/components/scaffold-page";
import { requireAccountSession } from "@/lib/auth/require-account-session";

export default async function SettingsPage() {
  await requireAccountSession("/settings");

  return (
    <ScaffoldPage
      title="Settings"
      description="Settings hub scaffold. Cross-feature account preferences and controls will land in subsequent phases."
    />
  );
}
