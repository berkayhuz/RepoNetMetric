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

type InvitationsReadOnlyPanelProps = {
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

export function InvitationsReadOnlyPanel({ invitations }: InvitationsReadOnlyPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invitations</CardTitle>
        <CardDescription>Read-only invitation timeline and status.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
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
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
