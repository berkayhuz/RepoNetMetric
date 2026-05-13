"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  Heading,
  Input,
  Text,
} from "@netmetric/ui";
import type { ReactNode } from "react";

import type { MfaStatusResponse } from "@/lib/account-api";

import {
  confirmMfaAction,
  disableMfaAction,
  regenerateRecoveryCodesAction,
  setupMfaAction,
} from "../actions/mfa-actions";
import { initialMutationState } from "../actions/mutation-state";
import { SecurityActionResult } from "./security-action-result";
import { RecoveryCodesDisplay } from "./recovery-codes-display";

type MfaManagementPanelProps = {
  mfaStatus: MfaStatusResponse;
};

function PendingButton({
  idleLabel,
  pendingLabel,
  variant = "default",
}: {
  idleLabel: string;
  pendingLabel: string;
  variant?: "default" | "outline" | "destructive";
}) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} variant={variant}>
      {pending ? pendingLabel : idleLabel}
    </Button>
  );
}

export function MfaManagementPanel({ mfaStatus }: MfaManagementPanelProps) {
  const [setupState, setupFormAction] = useActionState(setupMfaAction, initialMutationState);
  const [confirmState, confirmFormAction] = useActionState(confirmMfaAction, initialMutationState);
  const [disableState, disableFormAction] = useActionState(disableMfaAction, initialMutationState);
  const [recoveryState, recoveryFormAction] = useActionState(
    regenerateRecoveryCodesAction,
    initialMutationState,
  );

  const setupData = setupState.data?.setup;
  const recoveryCodes = confirmState.data?.recoveryCodes ?? recoveryState.data?.recoveryCodes ?? [];

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>Multi-factor Authentication</Heading>
        <Text className="text-muted-foreground">
          Manage MFA setup, confirmation, disable, and recovery code regeneration from this page.
        </Text>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>MFA status</CardTitle>
          <CardDescription>Current account second-factor posture.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Row
            label="MFA enabled"
            value={
              mfaStatus.isEnabled ? (
                <Badge variant="secondary">Enabled</Badge>
              ) : (
                <Badge variant="outline">Disabled</Badge>
              )
            }
          />
          <Row
            label="Authenticator configured"
            value={
              mfaStatus.hasAuthenticator ? (
                <Badge variant="secondary">Configured</Badge>
              ) : (
                <Badge variant="outline">Not configured</Badge>
              )
            }
          />
          <Row
            label="Recovery codes remaining"
            value={<Text>{String(mfaStatus.recoveryCodesRemaining)}</Text>}
          />
        </CardContent>
      </Card>

      {!mfaStatus.isEnabled ? (
        <Card>
          <CardHeader>
            <CardTitle>Setup MFA</CardTitle>
            <CardDescription>
              Start setup, then confirm with your authenticator code.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SecurityActionResult
              state={setupState}
              successTitle="Setup started"
              errorTitle="Setup failed"
            />
            <form action={setupFormAction} className="space-y-3">
              <Input type="hidden" name="confirm" value="setup-mfa" />
              <Text className="text-sm text-muted-foreground">
                Confirm to request a one-time MFA setup secret from the server.
              </Text>
              <PendingButton idleLabel="Start MFA setup" pendingLabel="Starting..." />
            </form>

            {setupData ? (
              <Card>
                <CardHeader>
                  <CardTitle>Setup details</CardTitle>
                  <CardDescription>
                    Use the key or URI in your authenticator app, then confirm below.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <Text className="text-sm text-muted-foreground">Manual key</Text>
                    <Text className="rounded-md border border-border bg-muted px-3 py-2 font-mono text-sm">
                      {setupData.sharedKey}
                    </Text>
                  </div>
                  <div className="space-y-1">
                    <Text className="text-sm text-muted-foreground">Authenticator URI</Text>
                    <Text className="break-all rounded-md border border-border bg-muted px-3 py-2 font-mono text-xs">
                      {setupData.authenticatorUri}
                    </Text>
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </CardContent>
        </Card>
      ) : null}

      {!mfaStatus.isEnabled || setupData ? (
        <Card>
          <CardHeader>
            <CardTitle>Confirm and enable MFA</CardTitle>
            <CardDescription>
              Enter the verification code from your authenticator app.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SecurityActionResult
              state={confirmState}
              successTitle="MFA enabled"
              errorTitle="Confirmation failed"
            />
            <form action={confirmFormAction} className="space-y-3" noValidate>
              <Field>
                <FieldLabel htmlFor="verificationCode">Verification code</FieldLabel>
                <FieldContent>
                  <Input
                    id="verificationCode"
                    name="verificationCode"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    aria-invalid={Boolean(confirmState.fieldErrors?.verificationCode?.[0])}
                    aria-describedby={
                      confirmState.fieldErrors?.verificationCode?.[0]
                        ? "verificationCode-error"
                        : undefined
                    }
                  />
                  <FieldError id="verificationCode-error">
                    {confirmState.fieldErrors?.verificationCode?.[0]}
                  </FieldError>
                </FieldContent>
              </Field>
              <PendingButton idleLabel="Enable MFA" pendingLabel="Enabling..." />
            </form>
          </CardContent>
        </Card>
      ) : null}

      {mfaStatus.isEnabled ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Disable MFA</CardTitle>
              <CardDescription>
                This reduces account protection. Confirm explicitly before continuing.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SecurityActionResult
                state={disableState}
                successTitle="MFA disabled"
                errorTitle="Disable failed"
              />
              <form action={disableFormAction} className="space-y-3" noValidate>
                <Input type="hidden" name="confirm" value="disable-mfa" />
                <Field>
                  <FieldLabel htmlFor="disableVerificationCode">Verification code</FieldLabel>
                  <FieldContent>
                    <Input
                      id="disableVerificationCode"
                      name="verificationCode"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      aria-invalid={Boolean(disableState.fieldErrors?.verificationCode?.[0])}
                      aria-describedby={
                        disableState.fieldErrors?.verificationCode?.[0]
                          ? "disableVerificationCode-error"
                          : undefined
                      }
                    />
                    <FieldError id="disableVerificationCode-error">
                      {disableState.fieldErrors?.verificationCode?.[0]}
                    </FieldError>
                  </FieldContent>
                </Field>
                <PendingButton
                  idleLabel="Disable MFA"
                  pendingLabel="Disabling..."
                  variant="destructive"
                />
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regenerate recovery codes</CardTitle>
              <CardDescription>
                Existing recovery codes become invalid immediately after regeneration.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SecurityActionResult
                state={recoveryState}
                successTitle="Recovery codes regenerated"
                errorTitle="Regeneration failed"
              />
              <form action={recoveryFormAction} className="space-y-3">
                <Input type="hidden" name="confirm" value="regenerate-recovery-codes" />
                <Text className="text-sm text-muted-foreground">
                  Confirm to invalidate previous recovery codes and receive a new set.
                </Text>
                <PendingButton idleLabel="Regenerate codes" pendingLabel="Regenerating..." />
              </form>
            </CardContent>
          </Card>
        </>
      ) : null}

      <RecoveryCodesDisplay codes={recoveryCodes} />
    </section>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Text className="text-sm text-muted-foreground">{label}</Text>
      {value}
    </div>
  );
}
