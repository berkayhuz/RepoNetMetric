import { ScaffoldPage } from "@/features/account/components/scaffold-page";
import { requireAccountSession } from "@/lib/auth/require-account-session";

export default async function ProfilePage() {
  await requireAccountSession();

  return (
    <ScaffoldPage
      title="Profile"
      description="Profile page scaffold. Profile retrieval and update flows will be implemented in a later phase."
    />
  );
}
