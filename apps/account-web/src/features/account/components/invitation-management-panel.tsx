import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Text,
} from "@netmetric/ui";

import type { AccountInvitationSummaryResponse } from "@/lib/account-api";
import { tAccountClient } from "@/lib/i18n/account-i18n";

import { resendInvitationAction, revokeInvitationAction } from "../actions/invitation-actions";
import { InvitationConfirmActionForm } from "./invitation-confirm-action-form";
import { InvitationCreateForm } from "./invitation-create-form";

type InvitationManagementPanelProps = {
  invitations: AccountInvitationSummaryResponse[];
};

function formatDate(value: string | null | undefined, emptyLabel: string): string {
  if (!value) {
    return emptyLabel;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return emptyLabel;
  }
  return date.toLocaleString();
}

function isPendingStatus(status: string): boolean {
  const normalized = status.trim().toLowerCase();
  return normalized === "pending" || normalized === "sent";
}

export function InvitationManagementPanel({ invitations }: InvitationManagementPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{tAccountClient("account.invitations.title")}</CardTitle>
        <CardDescription>{tAccountClient("account.invitations.manageDescription")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <InvitationCreateForm />

        {invitations.length === 0 ? (
          <Text className="text-sm text-muted-foreground">
            {tAccountClient("account.invitations.emptyTitle")}
          </Text>
        ) : (
          invitations.map((invitation) => (
            <div
              key={invitation.invitationId}
              className="space-y-2 rounded-md border border-border p-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Text className="font-medium">{invitation.email}</Text>
                <Badge variant="outline">{invitation.status}</Badge>
              </div>
              <Text className="text-xs text-muted-foreground">
                {tAccountClient("account.invitations.createdLabel")}:{" "}
                {formatDate(invitation.createdAtUtc, tAccountClient("account.common.notAvailable"))}
              </Text>
              <Text className="text-xs text-muted-foreground">
                {tAccountClient("account.invitations.expiresLabel")}:{" "}
                {formatDate(invitation.expiresAtUtc, tAccountClient("account.common.notAvailable"))}
              </Text>

              {isPendingStatus(invitation.status) ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <InvitationConfirmActionForm
                    invitationId={invitation.invitationId}
                    confirmValue="resend-invitation"
                    label={tAccountClient("account.invitations.resend")}
                    pendingLabel={tAccountClient("account.invitations.resending")}
                    variant="outline"
                    successTitle={tAccountClient("account.invitations.resent")}
                    errorTitle={tAccountClient("account.invitations.resendFailed")}
                    action={resendInvitationAction}
                  />
                  <InvitationConfirmActionForm
                    invitationId={invitation.invitationId}
                    confirmValue="revoke-invitation"
                    label={tAccountClient("account.invitations.revoke")}
                    pendingLabel={tAccountClient("account.common.revoking")}
                    variant="destructive"
                    successTitle={tAccountClient("account.invitations.revoked")}
                    errorTitle={tAccountClient("account.invitations.revokeFailed")}
                    action={revokeInvitationAction}
                  />
                </div>
              ) : (
                <Text className="text-xs text-muted-foreground">
                  {tAccountClient("account.invitations.actionsUnavailable")}
                </Text>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
