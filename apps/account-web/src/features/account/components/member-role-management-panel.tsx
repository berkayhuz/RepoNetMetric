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
import { tAccountClient } from "@/lib/i18n/account-i18n";

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
        <CardTitle>{tAccountClient("account.team.membersTitle")}</CardTitle>
        <CardDescription>{tAccountClient("account.team.memberRolesDescription")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {members.length === 0 ? (
          <Text className="text-sm text-muted-foreground">
            {tAccountClient("account.team.noMembers")}
          </Text>
        ) : (
          members.map((member) => (
            <div key={member.userId} className="space-y-3 rounded-md border border-border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Text className="font-medium">{member.userName || member.email}</Text>
                <Badge variant={member.isActive ? "secondary" : "outline"}>
                  {member.isActive
                    ? tAccountClient("account.common.active")
                    : tAccountClient("account.common.inactive")}
                </Badge>
              </div>
              <Text className="text-sm text-muted-foreground">{member.email}</Text>
              <div className="flex flex-wrap gap-2">
                {member.roles.length === 0 ? (
                  <Text className="text-xs text-muted-foreground">
                    {tAccountClient("account.team.noRolesAssigned")}
                  </Text>
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
                  {tAccountClient("account.team.roleUpdatesUnavailable")}
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
