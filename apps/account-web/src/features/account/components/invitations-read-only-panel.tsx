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

type InvitationsReadOnlyPanelProps = {
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

export function InvitationsReadOnlyPanel({ invitations }: InvitationsReadOnlyPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{tAccountClient("account.invitations.title")}</CardTitle>
        <CardDescription>{tAccountClient("account.invitations.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
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
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
