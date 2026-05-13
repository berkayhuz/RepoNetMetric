import { ScaffoldPage } from "@/features/account/components/scaffold-page";
import { requireAccountSession } from "@/lib/auth/require-account-session";

export default async function PreferencesPage() {
  await requireAccountSession();

  return (
    <ScaffoldPage
      title="Preferences"
      description="Preferences page scaffold. User preference loading and update behavior will be added in a later phase."
    />
  );
}
