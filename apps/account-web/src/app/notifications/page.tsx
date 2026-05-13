import { ScaffoldPage } from "@/features/account/components/scaffold-page";
import { requireAccountSession } from "@/lib/auth/require-account-session";

export default async function NotificationsPage() {
  await requireAccountSession("/notifications");

  return (
    <ScaffoldPage
      title="Notifications"
      description="Notifications center scaffold. Notification feed and preference sync will be integrated later."
    />
  );
}
