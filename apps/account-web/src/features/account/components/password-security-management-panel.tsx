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

import type { MutationState } from "../actions/mutation-state";
import { EmailChangeConfirmPanel } from "./email-change-confirm-panel";
import { EmailChangeRequestForm } from "./email-change-request-form";
import { PasswordChangeForm } from "./password-change-form";
import { tAccountClient } from "@/lib/i18n/account-i18n";

type PasswordSecurityManagementPanelProps = {
  mfaStatus: MfaStatusResponse;
  sessions: UserSessionsResponse;
  passwordAction: (state: MutationState, formData: FormData) => Promise<MutationState>;
  emailRequestAction: (state: MutationState, formData: FormData) => Promise<MutationState>;
  emailConfirmAction: (state: MutationState, formData: FormData) => Promise<MutationState>;
  confirmToken?: string;
};

export function PasswordSecurityManagementPanel({
  mfaStatus,
  sessions,
  passwordAction,
  emailRequestAction,
  emailConfirmAction,
  confirmToken,
}: PasswordSecurityManagementPanelProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>{tAccountClient("account.security.passwordEmailTitle")}</Heading>
        <Text className="text-muted-foreground">
          {tAccountClient("account.security.passwordEmailDescription")}
        </Text>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{tAccountClient("account.security.currentContext")}</CardTitle>
          <CardDescription>
            {tAccountClient("account.security.currentContextDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <Text className="text-sm text-muted-foreground">
            {tAccountClient("account.mfa.statusTitle")}:{" "}
            {mfaStatus.isEnabled
              ? tAccountClient("account.common.enabled")
              : tAccountClient("account.common.disabled")}
          </Text>
          <Text className="text-sm text-muted-foreground">
            {tAccountClient("account.sessions.activeTitle")}:{" "}
            {sessions.items.filter((item) => item.isActive).length}
          </Text>
        </CardContent>
      </Card>

      <PasswordChangeForm action={passwordAction} />
      <EmailChangeRequestForm action={emailRequestAction} />
      <EmailChangeConfirmPanel action={emailConfirmAction} tokenFromQuery={confirmToken} />
    </section>
  );
}
