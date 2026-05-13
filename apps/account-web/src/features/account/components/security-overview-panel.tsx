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
        <Heading level={2}>Security</Heading>
        <Text className="text-muted-foreground">
          Read-only security posture from account services.
        </Text>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          label="MFA"
          value={mfaStatus.isEnabled ? "Enabled" : "Disabled"}
          note={mfaStatus.hasAuthenticator ? "Authenticator ready" : "No authenticator configured"}
        />
        <SummaryCard
          label="Active sessions"
          value={String(sessions.items.filter((item) => item.isActive).length)}
          note={`Current count: ${overview.activeSessionCount}`}
        />
        <SummaryCard
          label="Trusted devices"
          value={String(trustedDevices.items.length)}
          note="Device revoke actions in next phase"
        />
        <SummaryCard
          label="Recovery codes"
          value={String(mfaStatus.recoveryCodesRemaining)}
          note="Regeneration in next phase"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Security actions roadmap</CardTitle>
          <CardDescription>
            Mutation actions are intentionally deferred to upcoming phases.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 sm:grid-cols-2">
            {[
              { href: "/security/password", label: "Password management" },
              { href: "/security/mfa", label: "MFA management" },
              { href: "/security/sessions", label: "Sessions and trusted devices" },
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
