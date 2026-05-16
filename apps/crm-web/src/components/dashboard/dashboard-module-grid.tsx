import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Text } from "@netmetric/ui";

import {
  canNavigateCrmModule,
  type CrmModuleRegistryItem,
} from "@/features/modules/module-registry";
import type { CrmCapabilities } from "@/lib/crm-auth/crm-capabilities";
import {
  getCrmEndpointDiscoveryLabel,
  getCrmModuleDescription,
  getCrmModuleTitle,
  getCrmStatusLabel,
  tCrm,
} from "@/lib/i18n/crm-i18n";

import { CrmModuleStatusBadge } from "../shell/crm-module-status-badge";

export function DashboardModuleGrid({
  modules,
  locale,
  capabilities,
}: Readonly<{
  modules: CrmModuleRegistryItem[];
  locale?: string | null | undefined;
  capabilities?: CrmCapabilities;
}>) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {modules.map((moduleItem) => (
        <Card key={moduleItem.id}>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle>{getCrmModuleTitle(moduleItem, locale)}</CardTitle>
              <CrmModuleStatusBadge status={moduleItem.status} locale={locale ?? null} />
            </div>
            <CardDescription>{getCrmModuleDescription(moduleItem, locale)}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Text className="text-sm text-muted-foreground">
              {tCrm("crm.modules.common.endpointStatus", locale)}:{" "}
              {getCrmEndpointDiscoveryLabel(moduleItem.endpointDiscoveryStatus, locale)}
            </Text>
            {canNavigateCrmModule(moduleItem, capabilities) ? (
              <Link
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                href={moduleItem.path}
              >
                {tCrm("crm.modules.common.openModule", locale)}
              </Link>
            ) : (
              <span className="text-sm font-medium text-muted-foreground" aria-disabled="true">
                {getCrmStatusLabel(moduleItem.status, locale)}
              </span>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
