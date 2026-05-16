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
import { tAccountClient } from "@/lib/i18n/account-i18n";

type SessionsReadOnlyPanelProps = {
  sessions: UserSessionsResponse;
  trustedDevices: TrustedDevicesResponse;
};

export function SessionsReadOnlyPanel({ sessions, trustedDevices }: SessionsReadOnlyPanelProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>{tAccountClient("account.sessions.title")}</Heading>
        <Text className="text-muted-foreground">
          {tAccountClient("account.sessions.readOnlyDescription")}
        </Text>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{tAccountClient("account.sessions.activeTitle")}</CardTitle>
          <CardDescription>{tAccountClient("account.sessions.activeDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {sessions.items.length === 0 ? (
            <Text className="text-muted-foreground">
              {tAccountClient("account.sessions.emptySessions")}
            </Text>
          ) : (
            sessions.items.map((session) => (
              <div key={session.id} className="rounded-md border border-border p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Text className="font-medium">
                    {session.deviceName || tAccountClient("account.sessions.unknownDevice")}
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    {session.isCurrent
                      ? tAccountClient("account.sessions.currentSession")
                      : session.isActive
                        ? tAccountClient("account.common.active")
                        : tAccountClient("account.common.inactive")}
                  </Text>
                </div>
                <Text className="text-sm text-muted-foreground">
                  {tAccountClient("account.sessions.userAgentLabel")}:{" "}
                  {session.userAgent || tAccountClient("account.common.notAvailable")}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  {tAccountClient("account.sessions.ipLabel")}:{" "}
                  {session.ipAddress || tAccountClient("account.common.notAvailable")}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  {tAccountClient("account.sessions.locationLabel")}:{" "}
                  {session.approximateLocation || tAccountClient("account.common.notAvailable")}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  {tAccountClient("account.sessions.lastSeenLabel")}: {session.lastSeenAt}
                </Text>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{tAccountClient("account.sessions.trustedTitle")}</CardTitle>
          <CardDescription>{tAccountClient("account.sessions.trustedDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {trustedDevices.items.length === 0 ? (
            <Text className="text-muted-foreground">
              {tAccountClient("account.sessions.emptyDevices")}
            </Text>
          ) : (
            trustedDevices.items.map((device) => (
              <div key={device.id} className="rounded-md border border-border p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Text className="font-medium">{device.name}</Text>
                  <Text className="text-sm text-muted-foreground">
                    {device.isCurrent
                      ? tAccountClient("account.sessions.currentDevice")
                      : device.isActive
                        ? tAccountClient("account.sessions.trusted")
                        : tAccountClient("account.sessions.expired")}
                  </Text>
                </div>
                <Text className="text-sm text-muted-foreground">
                  {tAccountClient("account.sessions.userAgentLabel")}:{" "}
                  {device.userAgent || tAccountClient("account.common.notAvailable")}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  {tAccountClient("account.sessions.ipLabel")}:{" "}
                  {device.ipAddress || tAccountClient("account.common.notAvailable")}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  {tAccountClient("account.sessions.trustedAtLabel")}: {device.trustedAt}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  {tAccountClient("account.sessions.expiresAtLabel")}: {device.expiresAt}
                </Text>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </section>
  );
}
