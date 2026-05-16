import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  Text,
} from "@netmetric/ui";

import type { TeamReadData } from "@/features/account/data/team-data";
import { tAccountClient } from "@/lib/i18n/account-i18n";

import { InvitationManagementPanel } from "./invitation-management-panel";
import { MemberRoleManagementPanel } from "./member-role-management-panel";
import { RolesCatalogPanel } from "./roles-catalog-panel";

type TeamManagementPanelProps = {
  teamData: TeamReadData;
};

export function TeamManagementPanel({ teamData }: TeamManagementPanelProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading level={2}>{tAccountClient("account.team.managementTitle")}</Heading>
        <Text className="text-muted-foreground">
          {tAccountClient("account.team.managementDescription")}
        </Text>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{tAccountClient("account.overview.title")}</CardTitle>
          <CardDescription>{tAccountClient("account.team.overviewDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-3">
          <Text className="text-sm text-muted-foreground">
            {tAccountClient("account.team.membersLabel")}: {teamData.members.length}
          </Text>
          <Text className="text-sm text-muted-foreground">
            {tAccountClient("account.team.rolesLabel")}: {teamData.rolesCatalog.length}
          </Text>
          <Text className="text-sm text-muted-foreground">
            {tAccountClient("account.team.invitationsLabel")}: {teamData.invitations.length}
          </Text>
        </CardContent>
      </Card>

      <MemberRoleManagementPanel members={teamData.members} rolesCatalog={teamData.rolesCatalog} />
      <RolesCatalogPanel rolesCatalog={teamData.rolesCatalog} />
      <InvitationManagementPanel invitations={teamData.invitations} />
    </section>
  );
}
