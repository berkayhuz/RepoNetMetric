import Link from "next/link";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  Text,
} from "@netmetric/ui";

import type { AccountOverviewResponse } from "@/lib/account-api";

import { ReadOnlyValue } from "./read-only-value";

type OverviewDataPanelProps = {
  overview: AccountOverviewResponse;
};

export function OverviewDataPanel({ overview }: OverviewDataPanelProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>Overview</Heading>
        <Text className="text-muted-foreground">
          Live account summary from the account service.
        </Text>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Identity</CardTitle>
            <CardDescription>Primary account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <Text className="text-sm text-muted-foreground">Display name</Text>
              <ReadOnlyValue value={overview.displayName} />
            </div>
            <div className="flex items-center justify-between gap-3">
              <Text className="text-sm text-muted-foreground">Avatar URL</Text>
              <ReadOnlyValue value={overview.avatarUrl} />
            </div>
            <div className="flex items-center justify-between gap-3">
              <Text className="text-sm text-muted-foreground">Organizations</Text>
              <ReadOnlyValue value={overview.organizations.length} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Authentication and session posture</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <Text className="text-sm text-muted-foreground">MFA enabled</Text>
              <Badge variant={overview.isMfaEnabled ? "secondary" : "outline"}>
                {overview.isMfaEnabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            <div className="flex items-center justify-between gap-3">
              <Text className="text-sm text-muted-foreground">Active sessions</Text>
              <ReadOnlyValue value={overview.activeSessionCount} />
            </div>
            <div className="flex items-center justify-between gap-3">
              <Text className="text-sm text-muted-foreground">Last security event</Text>
              <ReadOnlyValue value={overview.lastSecurityEventAt} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick links</CardTitle>
          <CardDescription>Common account areas</CardDescription>
        </CardHeader>
        <CardContent>
          <nav aria-label="Overview quick links">
            <ul className="grid gap-2 sm:grid-cols-2">
              {[
                { href: "/profile", label: "Profile" },
                { href: "/preferences", label: "Preferences" },
                { href: "/security", label: "Security" },
                { href: "/notifications", label: "Notifications" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </CardContent>
      </Card>
    </section>
  );
}
