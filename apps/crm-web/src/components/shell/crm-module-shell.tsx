import { Card, CardContent, CardDescription, CardHeader, CardTitle, Text } from "@netmetric/ui";

import { getCrmModuleByPath } from "@/features/modules/module-registry";
import {
  getCrmEndpointDiscoveryLabel,
  getCrmGroupLabel,
  getCrmModuleDescription,
  getCrmModuleImplementationPhase,
  getCrmModuleTitle,
  tCrm,
} from "@/lib/i18n/crm-i18n";

import { CrmPageHeader } from "./crm-page-header";
import { CrmModuleStatusBadge } from "./crm-module-status-badge";
import { CrmContractStatusPanel } from "./crm-contract-status-panel";

export function CrmModuleShell({
  path,
  locale,
}: Readonly<{ path: string; locale?: string | null }>) {
  const moduleItem = getCrmModuleByPath(path);

  if (!moduleItem) {
    return (
      <section className="space-y-6">
        <CrmPageHeader
          title={tCrm("crm.modules.common.module", locale)}
          description={tCrm("crm.modules.common.notFound", locale)}
        />
        <Card>
          <CardContent className="p-6">
            <Text className="text-muted-foreground">
              {tCrm("crm.modules.common.notFoundDetail", locale)}
            </Text>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <CrmPageHeader
        title={getCrmModuleTitle(moduleItem, locale)}
        description={getCrmModuleDescription(moduleItem, locale)}
      />

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
          <div className="space-y-1">
            <CardTitle>{getCrmModuleTitle(moduleItem, locale)}</CardTitle>
            <CardDescription>{getCrmGroupLabel(moduleItem.group, locale)}</CardDescription>
          </div>
          <CrmModuleStatusBadge status={moduleItem.status} locale={locale ?? null} />
        </CardHeader>
        <CardContent className="space-y-3">
          <Text className="text-sm text-muted-foreground">
            {tCrm("crm.modules.common.backendModuleFolder", locale)}:{" "}
            {moduleItem.backendModuleFolder}
          </Text>
          <Text className="text-sm text-muted-foreground">
            {tCrm("crm.modules.common.endpointDiscovery", locale)}:{" "}
            {getCrmEndpointDiscoveryLabel(moduleItem.endpointDiscoveryStatus, locale)}
          </Text>
          <Text className="text-sm text-muted-foreground">
            {tCrm("crm.modules.common.recommendedNextPhase", locale)}:{" "}
            {getCrmModuleImplementationPhase(moduleItem, locale)}
          </Text>
        </CardContent>
      </Card>

      {moduleItem.status === "active" || moduleItem.status === "read_only" ? null : (
        <CrmContractStatusPanel moduleItem={moduleItem} locale={locale ?? null} />
      )}
    </section>
  );
}
