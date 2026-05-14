import { Card, CardContent, CardDescription, CardHeader, CardTitle, Text } from "@netmetric/ui";

import { getCrmModuleByPath } from "@/features/modules/module-registry";

import { CrmPageHeader } from "./crm-page-header";
import { CrmModuleStatusBadge } from "./crm-module-status-badge";
import { CrmContractStatusPanel } from "./crm-contract-status-panel";

export function CrmModuleShell({ path }: Readonly<{ path: string }>) {
  const moduleItem = getCrmModuleByPath(path);

  if (!moduleItem) {
    return (
      <section className="space-y-6">
        <CrmPageHeader title="Module" description="Module registry entry was not found." />
        <Card>
          <CardContent className="p-6">
            <Text className="text-muted-foreground">
              This route exists but has no module registry metadata yet.
            </Text>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <CrmPageHeader title={moduleItem.title} description={moduleItem.description} />

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
          <div className="space-y-1">
            <CardTitle>{moduleItem.title}</CardTitle>
            <CardDescription>{moduleItem.group}</CardDescription>
          </div>
          <CrmModuleStatusBadge status={moduleItem.status} />
        </CardHeader>
        <CardContent className="space-y-3">
          <Text className="text-sm text-muted-foreground">
            Backend module folder: {moduleItem.backendModuleFolder}
          </Text>
          <Text className="text-sm text-muted-foreground">
            Endpoint discovery: {moduleItem.endpointDiscoveryStatus.replace("_", " ")}
          </Text>
          <Text className="text-sm text-muted-foreground">
            Recommended next phase: {moduleItem.implementationPhase}
          </Text>
        </CardContent>
      </Card>

      {moduleItem.status === "active" || moduleItem.status === "read_only" ? null : (
        <CrmContractStatusPanel moduleItem={moduleItem} />
      )}
    </section>
  );
}
