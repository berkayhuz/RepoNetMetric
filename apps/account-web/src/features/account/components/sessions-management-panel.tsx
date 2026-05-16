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
import type { AccountDateSettings } from "@/lib/account-date";
import { formatAccountDateTime } from "@/lib/account-date";

import { initialMutationState, type MutationState } from "../actions/mutation-state";
import { tAccountClient } from "@/lib/i18n/account-i18n";

type SessionsManagementPanelProps = {
  sessions: UserSessionsResponse;
  trustedDevices: TrustedDevicesResponse;
  dateSettings: AccountDateSettings;
  revokeSessionAction: (state: MutationState, formData: FormData) => Promise<MutationState>;
  revokeOtherSessionsAction: (state: MutationState, formData: FormData) => Promise<MutationState>;
  revokeTrustedDeviceAction: (state: MutationState, formData: FormData) => Promise<MutationState>;
  revokeOtherTrustedDevicesAction: (
    state: MutationState,
    formData: FormData,
  ) => Promise<MutationState>;
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
        <AlertTitle>{tAccountClient("account.common.success")}</AlertTitle>
        <AlertDescription>{state.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant="destructive">
      <AlertTitle>{tAccountClient("account.common.actionFailed")}</AlertTitle>
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
  revokeOtherTrustedDevicesAction,
  dateSettings,
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
  const [revokeOtherDevicesState, revokeOtherDevicesFormAction] = useActionState(
    revokeOtherTrustedDevicesAction,
    initialMutationState,
  );

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>{tAccountClient("account.sessions.title")}</Heading>
        <Text className="text-muted-foreground">
          {tAccountClient("account.sessions.manageDescription")}
        </Text>
      </div>

      <MutationStateAlert state={revokeSessionState} />
      <MutationStateAlert state={revokeOthersState} />
      <MutationStateAlert state={revokeDeviceState} />
      <MutationStateAlert state={revokeOtherDevicesState} />

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
              <div key={session.id} className="rounded-md border border-border p-3 space-y-2">
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
                  {tAccountClient("account.sessions.lastSeenLabel")}:{" "}
                  {formatAccountDateTime(session.lastSeenAt, dateSettings)}
                </Text>

                {session.isCurrent ? (
                  <Text className="text-xs text-muted-foreground">
                    {tAccountClient("account.sessions.currentCannotRevoke")}
                  </Text>
                ) : (
                  <details className="rounded-md border border-border p-2">
                    <summary className="cursor-pointer text-sm font-medium">
                      {tAccountClient("account.sessions.revokeThisSession")}
                    </summary>
                    <form action={revokeSessionFormAction} className="mt-3 space-y-2">
                      <input type="hidden" name="sessionId" value={session.id} />
                      <Text className="text-xs text-muted-foreground">
                        {tAccountClient("account.sessions.revokeThisSessionDescription")}
                      </Text>
                      <SubmitButton
                        label={tAccountClient("account.sessions.confirmRevokeSession")}
                        pendingLabel={tAccountClient("account.sessions.revokingSession")}
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
                {tAccountClient("account.sessions.revokeOtherSessions")}
              </summary>
              <form action={revokeOthersFormAction} className="mt-3 space-y-2">
                <input type="hidden" name="confirm" value="revoke-others" />
                <Text className="text-xs text-muted-foreground">
                  {tAccountClient("account.sessions.revokeOtherSessionsDescription")}
                </Text>
                <SubmitButton
                  label={tAccountClient("account.sessions.confirmRevokeOtherSessions")}
                  pendingLabel={tAccountClient("account.sessions.revokingOthers")}
                />
              </form>
            </details>
          ) : null}
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
              <div key={device.id} className="rounded-md border border-border p-3 space-y-2">
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
                  {tAccountClient("account.sessions.trustedAtLabel")}:{" "}
                  {formatAccountDateTime(device.trustedAt, dateSettings)}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  {tAccountClient("account.sessions.expiresAtLabel")}:{" "}
                  {formatAccountDateTime(device.expiresAt, dateSettings)}
                </Text>

                <details className="rounded-md border border-border p-2">
                  <summary className="cursor-pointer text-sm font-medium">
                    {tAccountClient("account.sessions.revokeTrustedDevice")}
                  </summary>
                  <form action={revokeDeviceFormAction} className="mt-3 space-y-2">
                    <input type="hidden" name="deviceId" value={device.id} />
                    <input type="hidden" name="confirm" value="revoke-device" />
                    <Text className="text-xs text-muted-foreground">
                      {tAccountClient("account.sessions.revokeTrustedDeviceDescription")}
                    </Text>
                    <SubmitButton
                      label={tAccountClient("account.sessions.confirmRevokeDevice")}
                      pendingLabel={tAccountClient("account.sessions.revokingDevice")}
                    />
                  </form>
                </details>
              </div>
            ))
          )}
          {trustedDevices.items.some((device) => !device.isCurrent && device.isActive) ? (
            <details className="rounded-md border border-border p-3">
              <summary className="cursor-pointer text-sm font-medium">
                {tAccountClient("account.sessions.revokeOtherTrustedDevices")}
              </summary>
              <form action={revokeOtherDevicesFormAction} className="mt-3 space-y-2">
                <input type="hidden" name="confirm" value="revoke-other-devices" />
                <Text className="text-xs text-muted-foreground">
                  {tAccountClient("account.sessions.revokeOtherTrustedDevicesDescription")}
                </Text>
                <SubmitButton
                  label={tAccountClient("account.sessions.confirmRevokeOtherDevices")}
                  pendingLabel={tAccountClient("account.sessions.revokingOtherDevices")}
                />
              </form>
            </details>
          ) : null}
        </CardContent>
      </Card>
    </section>
  );
}
