import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Text } from "@netmetric/ui";

import type { CrmModuleRegistryItem } from "@/features/modules/module-registry";

import { CrmModuleStatusBadge } from "../shell/crm-module-status-badge";

export function DashboardModuleGrid({ modules }: Readonly<{ modules: CrmModuleRegistryItem[] }>) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {modules.map((moduleItem) => (
        <Card key={moduleItem.id}>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle>{moduleItem.title}</CardTitle>
              <CrmModuleStatusBadge status={moduleItem.status} />
            </div>
            <CardDescription>{moduleItem.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Text className="text-sm text-muted-foreground">
              Endpoint status: {moduleItem.endpointDiscoveryStatus.replace("_", " ")}
            </Text>
            <Link
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              href={moduleItem.path}
            >
              Open module
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
