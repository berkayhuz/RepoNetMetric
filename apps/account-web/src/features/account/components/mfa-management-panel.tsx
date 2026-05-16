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
import { tAccountClient } from "@/lib/i18n/account-i18n";

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
        <Heading level={2}>{tAccountClient("account.mfa.title")}</Heading>
        <Text className="text-muted-foreground">{tAccountClient("account.mfa.description")}</Text>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{tAccountClient("account.mfa.statusTitle")}</CardTitle>
          <CardDescription>{tAccountClient("account.mfa.statusDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Row
            label={tAccountClient("account.mfa.enabledLabel")}
            value={
              mfaStatus.isEnabled ? (
                <Badge variant="secondary">{tAccountClient("account.common.enabled")}</Badge>
              ) : (
                <Badge variant="outline">{tAccountClient("account.common.disabled")}</Badge>
              )
            }
          />
          <Row
            label={tAccountClient("account.mfa.authenticatorConfigured")}
            value={
              mfaStatus.hasAuthenticator ? (
                <Badge variant="secondary">{tAccountClient("account.common.configured")}</Badge>
              ) : (
                <Badge variant="outline">{tAccountClient("account.common.notConfigured")}</Badge>
              )
            }
          />
          <Row
            label={tAccountClient("account.mfa.recoveryCodesRemaining")}
            value={<Text>{String(mfaStatus.recoveryCodesRemaining)}</Text>}
          />
        </CardContent>
      </Card>

      {!mfaStatus.isEnabled ? (
        <Card>
          <CardHeader>
            <CardTitle>{tAccountClient("account.mfa.setupTitle")}</CardTitle>
            <CardDescription>{tAccountClient("account.mfa.setupDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SecurityActionResult
              state={setupState}
              successTitle={tAccountClient("account.mfa.setupStarted")}
              errorTitle={tAccountClient("account.mfa.setupFailed")}
            />
            <form action={setupFormAction} className="space-y-3">
              <Input type="hidden" name="confirm" value="setup-mfa" />
              <Text className="text-sm text-muted-foreground">
                {tAccountClient("account.mfa.setupConfirm")}
              </Text>
              <PendingButton
                idleLabel={tAccountClient("account.mfa.startSetup")}
                pendingLabel={tAccountClient("account.mfa.starting")}
              />
            </form>

            {setupData ? (
              <Card>
                <CardHeader>
                  <CardTitle>{tAccountClient("account.mfa.setupDetails")}</CardTitle>
                  <CardDescription>
                    {tAccountClient("account.mfa.setupDetailsDescription")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <Text className="text-sm text-muted-foreground">
                      {tAccountClient("account.mfa.manualKey")}
                    </Text>
                    <Text className="rounded-md border border-border bg-muted px-3 py-2 font-mono text-sm">
                      {setupData.sharedKey}
                    </Text>
                  </div>
                  <div className="space-y-1">
                    <Text className="text-sm text-muted-foreground">
                      {tAccountClient("account.mfa.authenticatorUri")}
                    </Text>
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
            <CardTitle>{tAccountClient("account.mfa.confirmTitle")}</CardTitle>
            <CardDescription>{tAccountClient("account.mfa.confirmDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SecurityActionResult
              state={confirmState}
              successTitle={tAccountClient("account.mfa.enabledSuccess")}
              errorTitle={tAccountClient("account.mfa.confirmFailed")}
            />
            <form action={confirmFormAction} className="space-y-3" noValidate>
              <Field>
                <FieldLabel htmlFor="verificationCode">
                  {tAccountClient("account.mfa.verificationCode")}
                </FieldLabel>
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
              <PendingButton
                idleLabel={tAccountClient("account.mfa.enable")}
                pendingLabel={tAccountClient("account.mfa.enabling")}
              />
            </form>
          </CardContent>
        </Card>
      ) : null}

      {mfaStatus.isEnabled ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>{tAccountClient("account.mfa.disableTitle")}</CardTitle>
              <CardDescription>{tAccountClient("account.mfa.disableDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SecurityActionResult
                state={disableState}
                successTitle={tAccountClient("account.mfa.disabledSuccess")}
                errorTitle={tAccountClient("account.mfa.disableFailed")}
              />
              <form action={disableFormAction} className="space-y-3" noValidate>
                <Input type="hidden" name="confirm" value="disable-mfa" />
                <Field>
                  <FieldLabel htmlFor="disableVerificationCode">
                    {tAccountClient("account.mfa.verificationCode")}
                  </FieldLabel>
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
                  idleLabel={tAccountClient("account.mfa.disable")}
                  pendingLabel={tAccountClient("account.mfa.disabling")}
                  variant="destructive"
                />
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{tAccountClient("account.mfa.regenerateRecoveryCodes")}</CardTitle>
              <CardDescription>
                {tAccountClient("account.mfa.regenerateDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SecurityActionResult
                state={recoveryState}
                successTitle={tAccountClient("account.mfa.recoveryRegenerated")}
                errorTitle={tAccountClient("account.mfa.regenerationFailed")}
              />
              <form action={recoveryFormAction} className="space-y-3">
                <Input type="hidden" name="confirm" value="regenerate-recovery-codes" />
                <Text className="text-sm text-muted-foreground">
                  {tAccountClient("account.mfa.regenerateConfirm")}
                </Text>
                <PendingButton
                  idleLabel={tAccountClient("account.mfa.regenerate")}
                  pendingLabel={tAccountClient("account.mfa.regenerating")}
                />
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
