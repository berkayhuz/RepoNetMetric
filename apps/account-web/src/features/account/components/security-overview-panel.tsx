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

import { tAccountClient } from "@/lib/i18n/account-i18n";
import type {
  AccountOverviewResponse,
  MfaStatusResponse,
  TrustedDevicesResponse,
  UserSessionsResponse,
} from "@/lib/account-api";

type SecurityOverviewPanelProps = {
  overview: AccountOverviewResponse;
  mfaStatus: MfaStatusResponse;
  sessions: UserSessionsResponse;
  trustedDevices: TrustedDevicesResponse;
};

export function SecurityOverviewPanel({
  overview,
  mfaStatus,
  sessions,
  trustedDevices,
}: SecurityOverviewPanelProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>{tAccountClient("account.security.title")}</Heading>
        <Text className="text-muted-foreground">
          {tAccountClient("account.security.postureDescription")}
        </Text>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          label={tAccountClient("account.mfa.short")}
          value={
            mfaStatus.isEnabled
              ? tAccountClient("account.common.enabled")
              : tAccountClient("account.common.disabled")
          }
          note={
            mfaStatus.hasAuthenticator
              ? tAccountClient("account.mfa.authenticatorReady")
              : tAccountClient("account.mfa.noAuthenticatorConfigured")
          }
        />
        <SummaryCard
          label={tAccountClient("account.sessions.activeTitle")}
          value={String(sessions.items.filter((item) => item.isActive).length)}
          note={tAccountClient("account.security.currentCount", {
            count: overview.activeSessionCount,
          })}
        />
        <SummaryCard
          label={tAccountClient("account.sessions.trustedTitle")}
          value={String(trustedDevices.items.length)}
          note={tAccountClient("account.sessions.revokeNextPhase")}
        />
        <SummaryCard
          label={tAccountClient("account.mfa.recoveryCodesTitle")}
          value={String(mfaStatus.recoveryCodesRemaining)}
          note={tAccountClient("account.mfa.regenerationNextPhase")}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{tAccountClient("account.security.actionsRoadmap")}</CardTitle>
          <CardDescription>
            {tAccountClient("account.security.actionsRoadmapDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 sm:grid-cols-2">
            {[
              {
                href: "/security/password",
                label: tAccountClient("account.security.passwordManagement"),
              },
              { href: "/security/mfa", label: tAccountClient("account.mfa.managementTitle") },
              {
                href: "/security/sessions",
                label: tAccountClient("account.sessions.managementTitle"),
              },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}

function SummaryCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-xl">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge variant="outline">{note}</Badge>
      </CardContent>
    </Card>
  );
}
