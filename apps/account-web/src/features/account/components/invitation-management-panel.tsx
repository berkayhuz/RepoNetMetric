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

import { resendInvitationAction, revokeInvitationAction } from "../actions/invitation-actions";
import { InvitationConfirmActionForm } from "./invitation-confirm-action-form";
import { InvitationCreateForm } from "./invitation-create-form";

type InvitationManagementPanelProps = {
  invitations: AccountInvitationSummaryResponse[];
};

function formatDate(value: string | null | undefined): string {
  if (!value) {
    return "Not available";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Not available";
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
        <CardTitle>Invitations</CardTitle>
        <CardDescription>
          Manage workspace invitations. Member and role changes are not available in this phase.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <InvitationCreateForm />

        {invitations.length === 0 ? (
          <Text className="text-sm text-muted-foreground">No invitations available.</Text>
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
                Created: {formatDate(invitation.createdAtUtc)}
              </Text>
              <Text className="text-xs text-muted-foreground">
                Expires: {formatDate(invitation.expiresAtUtc)}
              </Text>

              {isPendingStatus(invitation.status) ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <InvitationConfirmActionForm
                    invitationId={invitation.invitationId}
                    confirmValue="resend-invitation"
                    label="Resend invitation"
                    pendingLabel="Resending..."
                    variant="outline"
                    successTitle="Invitation resent"
                    errorTitle="Resend failed"
                    action={resendInvitationAction}
                  />
                  <InvitationConfirmActionForm
                    invitationId={invitation.invitationId}
                    confirmValue="revoke-invitation"
                    label="Revoke invitation"
                    pendingLabel="Revoking..."
                    variant="destructive"
                    successTitle="Invitation revoked"
                    errorTitle="Revoke failed"
                    action={revokeInvitationAction}
                  />
                </div>
              ) : (
                <Text className="text-xs text-muted-foreground">
                  Invitation actions are unavailable for this status.
                </Text>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
