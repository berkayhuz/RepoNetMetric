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
        <Heading level={2}>Password & Email Security</Heading>
        <Text className="text-muted-foreground">
          Manage core account credentials. MFA and session controls remain available on their
          dedicated pages.
        </Text>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current security context</CardTitle>
          <CardDescription>
            Context to review before changing critical security settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <Text className="text-sm text-muted-foreground">
            MFA status: {mfaStatus.isEnabled ? "Enabled" : "Disabled"}
          </Text>
          <Text className="text-sm text-muted-foreground">
            Active sessions: {sessions.items.filter((item) => item.isActive).length}
          </Text>
        </CardContent>
      </Card>

      <PasswordChangeForm action={passwordAction} />
      <EmailChangeRequestForm action={emailRequestAction} />
      <EmailChangeConfirmPanel action={emailConfirmAction} tokenFromQuery={confirmToken} />
    </section>
  );
}
