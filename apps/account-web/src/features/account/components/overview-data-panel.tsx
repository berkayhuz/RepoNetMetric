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
import { tAccountClient } from "@/lib/i18n/account-i18n";

type OverviewDataPanelProps = {
  overview: AccountOverviewResponse;
};

export function OverviewDataPanel({ overview }: OverviewDataPanelProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>{tAccountClient("account.overview.title")}</Heading>
        <Text className="text-muted-foreground">
          {tAccountClient("account.overview.description")}
        </Text>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{tAccountClient("account.overview.identityTitle")}</CardTitle>
            <CardDescription>
              {tAccountClient("account.overview.identityDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <Text className="text-sm text-muted-foreground">
                {tAccountClient("account.fields.displayName")}
              </Text>
              <ReadOnlyValue value={overview.displayName} />
            </div>
            <div className="flex items-center justify-between gap-3">
              <Text className="text-sm text-muted-foreground">
                {tAccountClient("account.fields.avatarUrl")}
              </Text>
              <ReadOnlyValue value={overview.avatarUrl} />
            </div>
            <div className="flex items-center justify-between gap-3">
              <Text className="text-sm text-muted-foreground">
                {tAccountClient("account.overview.organizationsTitle")}
              </Text>
              <ReadOnlyValue value={overview.organizations.length} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{tAccountClient("account.security.title")}</CardTitle>
            <CardDescription>
              {tAccountClient("account.security.postureDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <Text className="text-sm text-muted-foreground">
                {tAccountClient("account.mfa.enabledLabel")}
              </Text>
              <Badge variant={overview.isMfaEnabled ? "secondary" : "outline"}>
                {overview.isMfaEnabled
                  ? tAccountClient("account.common.enabled")
                  : tAccountClient("account.common.disabled")}
              </Badge>
            </div>
            <div className="flex items-center justify-between gap-3">
              <Text className="text-sm text-muted-foreground">
                {tAccountClient("account.sessions.activeTitle")}
              </Text>
              <ReadOnlyValue value={overview.activeSessionCount} />
            </div>
            <div className="flex items-center justify-between gap-3">
              <Text className="text-sm text-muted-foreground">
                {tAccountClient("account.security.lastEvent")}
              </Text>
              <ReadOnlyValue value={overview.lastSecurityEventAt} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{tAccountClient("account.overview.quickLinks")}</CardTitle>
          <CardDescription>
            {tAccountClient("account.overview.quickLinksDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <nav aria-label={tAccountClient("account.a11y.overviewQuickLinks")}>
            <ul className="grid gap-2 sm:grid-cols-2">
              {[
                { href: "/profile", label: tAccountClient("account.profile.title") },
                { href: "/preferences", label: tAccountClient("account.preferences.title") },
                { href: "/security", label: tAccountClient("account.security.title") },
                { href: "/notifications", label: tAccountClient("account.notifications.title") },
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
