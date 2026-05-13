import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Text,
} from "@netmetric/ui";

import type { AccountRoleCatalogResponse } from "@/lib/account-api";

type RolesCatalogPanelProps = {
  rolesCatalog: AccountRoleCatalogResponse[];
};

export function RolesCatalogPanel({ rolesCatalog }: RolesCatalogPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Roles catalog</CardTitle>
        <CardDescription>Available workspace roles and permissions.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {rolesCatalog.length === 0 ? (
          <Text className="text-sm text-muted-foreground">No roles available.</Text>
        ) : (
          rolesCatalog.map((role) => (
            <div key={role.name} className="space-y-2 rounded-md border border-border p-3">
              <div className="flex flex-wrap items-center gap-2">
                <Text className="font-medium">{role.name}</Text>
                <Badge variant="outline">Rank {role.rank}</Badge>
                {role.isProtected ? <Badge variant="secondary">Protected</Badge> : null}
              </div>
              <div className="flex flex-wrap gap-2">
                {role.permissions.length === 0 ? (
                  <Text className="text-xs text-muted-foreground">No permissions listed.</Text>
                ) : (
                  role.permissions.map((permission) => (
                    <Badge key={permission} variant="outline">
                      {permission}
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
