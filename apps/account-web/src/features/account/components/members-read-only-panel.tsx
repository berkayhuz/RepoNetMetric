import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Text,
} from "@netmetric/ui";

import type { AccountMemberResponse } from "@/lib/account-api";

type MembersReadOnlyPanelProps = {
  members: AccountMemberResponse[];
};

export function MembersReadOnlyPanel({ members }: MembersReadOnlyPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Members</CardTitle>
        <CardDescription>Read-only workspace member list.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {members.length === 0 ? (
          <Text className="text-sm text-muted-foreground">No members available.</Text>
        ) : (
          members.map((member) => (
            <div key={member.userId} className="space-y-2 rounded-md border border-border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Text className="font-medium">{member.userName || member.email}</Text>
                <Badge variant={member.isActive ? "secondary" : "outline"}>
                  {member.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <Text className="text-sm text-muted-foreground">{member.email}</Text>
              <div className="flex flex-wrap gap-2">
                {member.roles.length === 0 ? (
                  <Text className="text-xs text-muted-foreground">No roles assigned.</Text>
                ) : (
                  member.roles.map((role) => (
                    <Badge key={role} variant="outline">
                      {role}
                    </Badge>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
