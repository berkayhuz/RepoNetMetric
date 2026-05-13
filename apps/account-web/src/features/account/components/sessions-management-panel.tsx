"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  Text,
} from "@netmetric/ui";

import type { TrustedDevicesResponse, UserSessionsResponse } from "@/lib/account-api";

import { initialMutationState, type MutationState } from "../actions/mutation-state";

type SessionsManagementPanelProps = {
  sessions: UserSessionsResponse;
  trustedDevices: TrustedDevicesResponse;
  revokeSessionAction: (state: MutationState, formData: FormData) => Promise<MutationState>;
  revokeOtherSessionsAction: (state: MutationState, formData: FormData) => Promise<MutationState>;
  revokeTrustedDeviceAction: (state: MutationState, formData: FormData) => Promise<MutationState>;
};

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="destructive" disabled={pending}>
      {pending ? pendingLabel : label}
    </Button>
  );
}

function MutationStateAlert({ state }: { state: MutationState }) {
  if (state.status === "idle") {
    return null;
  }

  if (state.status === "success") {
    return (
      <Alert>
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>{state.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant="destructive">
      <AlertTitle>Action failed</AlertTitle>
      <AlertDescription>{state.message}</AlertDescription>
    </Alert>
  );
}

export function SessionsManagementPanel({
  sessions,
  trustedDevices,
  revokeSessionAction,
  revokeOtherSessionsAction,
  revokeTrustedDeviceAction,
}: SessionsManagementPanelProps) {
  const [revokeSessionState, revokeSessionFormAction] = useActionState(
    revokeSessionAction,
    initialMutationState,
  );
  const [revokeOthersState, revokeOthersFormAction] = useActionState(
    revokeOtherSessionsAction,
    initialMutationState,
  );
  const [revokeDeviceState, revokeDeviceFormAction] = useActionState(
    revokeTrustedDeviceAction,
    initialMutationState,
  );

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>Sessions & Trusted Devices</Heading>
        <Text className="text-muted-foreground">
          Manage active sessions and trusted devices with confirmation prompts.
        </Text>
      </div>

      <MutationStateAlert state={revokeSessionState} />
      <MutationStateAlert state={revokeOthersState} />
      <MutationStateAlert state={revokeDeviceState} />

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
              <div key={session.id} className="rounded-md border border-border p-3 space-y-2">
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

                {session.isCurrent ? (
                  <Text className="text-xs text-muted-foreground">
                    Current session cannot be revoked from this page.
                  </Text>
                ) : (
                  <details className="rounded-md border border-border p-2">
                    <summary className="cursor-pointer text-sm font-medium">
                      Revoke this session
                    </summary>
                    <form action={revokeSessionFormAction} className="mt-3 space-y-2">
                      <input type="hidden" name="sessionId" value={session.id} />
                      <Text className="text-xs text-muted-foreground">
                        This will sign out the selected session.
                      </Text>
                      <SubmitButton
                        label="Confirm revoke session"
                        pendingLabel="Revoking session..."
                      />
                    </form>
                  </details>
                )}
              </div>
            ))
          )}

          {sessions.items.some((session) => !session.isCurrent) ? (
            <details className="rounded-md border border-border p-3">
              <summary className="cursor-pointer text-sm font-medium">
                Revoke all other sessions
              </summary>
              <form action={revokeOthersFormAction} className="mt-3 space-y-2">
                <input type="hidden" name="confirm" value="revoke-others" />
                <Text className="text-xs text-muted-foreground">
                  This signs out every session except the current one.
                </Text>
                <SubmitButton
                  label="Confirm revoke other sessions"
                  pendingLabel="Revoking others..."
                />
              </form>
            </details>
          ) : null}
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
              <div key={device.id} className="rounded-md border border-border p-3 space-y-2">
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

                <details className="rounded-md border border-border p-2">
                  <summary className="cursor-pointer text-sm font-medium">
                    Revoke trusted device
                  </summary>
                  <form action={revokeDeviceFormAction} className="mt-3 space-y-2">
                    <input type="hidden" name="deviceId" value={device.id} />
                    <input type="hidden" name="confirm" value="revoke-device" />
                    <Text className="text-xs text-muted-foreground">
                      This removes trusted status for the selected device.
                    </Text>
                    <SubmitButton label="Confirm revoke device" pendingLabel="Revoking device..." />
                  </form>
                </details>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </section>
  );
}
