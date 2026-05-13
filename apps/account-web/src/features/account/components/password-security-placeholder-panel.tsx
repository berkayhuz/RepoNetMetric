import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  Text,
} from "@netmetric/ui";

import type { MfaStatusResponse, UserSessionsResponse } from "@/lib/account-api";

type PasswordSecurityPlaceholderPanelProps = {
  mfaStatus: MfaStatusResponse;
  sessions: UserSessionsResponse;
};

export function PasswordSecurityPlaceholderPanel({
  mfaStatus,
  sessions,
}: PasswordSecurityPlaceholderPanelProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>Password & Account Access</Heading>
        <Text className="text-muted-foreground">
          Password and email change actions will be implemented in the next mutation phase.
        </Text>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current security context</CardTitle>
          <CardDescription>Useful read-only state before action flows are enabled.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Text className="text-sm text-muted-foreground">
            MFA status: {mfaStatus.isEnabled ? "Enabled" : "Disabled"}
          </Text>
          <Text className="text-sm text-muted-foreground">
            Active sessions: {sessions.items.filter((item) => item.isActive).length}
          </Text>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related security pages</CardTitle>
          <CardDescription>Read-only pages available now.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {[
            { href: "/security", label: "Security overview" },
            { href: "/security/sessions", label: "Sessions & devices" },
            { href: "/security/mfa", label: "MFA status" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {item.label}
            </Link>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
