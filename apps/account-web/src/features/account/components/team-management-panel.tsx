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
        <Heading level={2}>Team management</Heading>
        <Text className="text-muted-foreground">
          Manage invitations and member roles. Backend authorization policies remain authoritative.
        </Text>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Current read-only team metrics.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-3">
          <Text className="text-sm text-muted-foreground">Members: {teamData.members.length}</Text>
          <Text className="text-sm text-muted-foreground">
            Roles: {teamData.rolesCatalog.length}
          </Text>
          <Text className="text-sm text-muted-foreground">
            Invitations: {teamData.invitations.length}
          </Text>
        </CardContent>
      </Card>

      <MemberRoleManagementPanel members={teamData.members} rolesCatalog={teamData.rolesCatalog} />
      <RolesCatalogPanel rolesCatalog={teamData.rolesCatalog} />
      <InvitationManagementPanel invitations={teamData.invitations} />
    </section>
  );
}
