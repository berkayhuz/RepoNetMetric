import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  Text,
} from "@netmetric/ui";

import { PlaceholderDashboardCard } from "@/features/account/components/placeholder-dashboard-card";
import { requireAccountSession } from "@/lib/auth/require-account-session";

export default async function AccountOverviewPage() {
  await requireAccountSession();

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>Overview</Heading>
        <Text className="text-muted-foreground">
          Phase 1 scaffold for account.netmetric.net. No account data is connected yet.
        </Text>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scaffold Scope</CardTitle>
          <CardDescription>
            This release provides routing, layout, and shared UI composition only.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Text className="text-sm text-muted-foreground">
            Auth bridge, Account API integration, and mutable settings flows are intentionally
            deferred to later phases.
          </Text>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <PlaceholderDashboardCard
          title="Profile"
          description="Identity and contact details placeholder."
        />
        <PlaceholderDashboardCard
          title="Security"
          description="Password, MFA, and session controls placeholder."
        />
        <PlaceholderDashboardCard
          title="Notifications"
          description="Notification center and preferences placeholder."
        />
      </div>
    </section>
  );
}
