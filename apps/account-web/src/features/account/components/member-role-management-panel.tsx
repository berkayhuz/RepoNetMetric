import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Text,
} from "@netmetric/ui";

import type { AccountMemberResponse, AccountRoleCatalogResponse } from "@/lib/account-api";

import { MemberRoleUpdateForm } from "./member-role-update-form";

type MemberRoleManagementPanelProps = {
  members: AccountMemberResponse[];
  rolesCatalog: AccountRoleCatalogResponse[];
};

export function MemberRoleManagementPanel({
  members,
  rolesCatalog,
}: MemberRoleManagementPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Members</CardTitle>
        <CardDescription>Manage member roles where allowed by backend policy.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {members.length === 0 ? (
          <Text className="text-sm text-muted-foreground">No members available.</Text>
        ) : (
          members.map((member) => (
            <div key={member.userId} className="space-y-3 rounded-md border border-border p-3">
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

              {rolesCatalog.length === 0 ? (
                <Text className="text-xs text-muted-foreground">
                  Role updates are unavailable because the roles catalog is empty.
                </Text>
              ) : (
                <MemberRoleUpdateForm member={member} rolesCatalog={rolesCatalog} />
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
