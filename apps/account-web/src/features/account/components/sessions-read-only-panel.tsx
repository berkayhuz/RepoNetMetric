import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  Text,
} from "@netmetric/ui";

import type { TrustedDevicesResponse, UserSessionsResponse } from "@/lib/account-api";

type SessionsReadOnlyPanelProps = {
  sessions: UserSessionsResponse;
  trustedDevices: TrustedDevicesResponse;
};

export function SessionsReadOnlyPanel({ sessions, trustedDevices }: SessionsReadOnlyPanelProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>Sessions & Trusted Devices</Heading>
        <Text className="text-muted-foreground">
          Read-only session and device visibility. Revoke actions are coming in the next phase.
        </Text>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active sessions</CardTitle>
          <CardDescription>Current and recent authenticated sessions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {sessions.items.length === 0 ? (
            <Text className="text-muted-foreground">No active sessions available.</Text>
          ) : (
            sessions.items.map((session) => (
              <div key={session.id} className="rounded-md border border-border p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Text className="font-medium">{session.deviceName || "Unknown device"}</Text>
                  <Text className="text-sm text-muted-foreground">
                    {session.isCurrent
                      ? "Current session"
                      : session.isActive
                        ? "Active"
                        : "Inactive"}
                  </Text>
                </div>
                <Text className="text-sm text-muted-foreground">
                  User agent: {session.userAgent || "Not available"}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  IP: {session.ipAddress || "Not available"}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  Location: {session.approximateLocation || "Not available"}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  Last seen: {session.lastSeenAt}
                </Text>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trusted devices</CardTitle>
          <CardDescription>Devices marked as trusted for account sign-in flows.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {trustedDevices.items.length === 0 ? (
            <Text className="text-muted-foreground">No trusted devices found.</Text>
          ) : (
            trustedDevices.items.map((device) => (
              <div key={device.id} className="rounded-md border border-border p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Text className="font-medium">{device.name}</Text>
                  <Text className="text-sm text-muted-foreground">
                    {device.isCurrent ? "Current device" : device.isActive ? "Trusted" : "Expired"}
                  </Text>
                </div>
                <Text className="text-sm text-muted-foreground">
                  User agent: {device.userAgent || "Not available"}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  IP: {device.ipAddress || "Not available"}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  Trusted at: {device.trustedAt}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  Expires at: {device.expiresAt}
                </Text>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </section>
  );
}
