import { Alert, AlertDescription, AlertTitle } from "@netmetric/ui";

import type { CrmModuleRegistryItem } from "@/features/modules/module-registry";

export function CrmContractStatusPanel({
  moduleItem,
}: Readonly<{ moduleItem: CrmModuleRegistryItem }>) {
  return (
    <Alert>
      <AlertTitle>Implementation status: {moduleItem.status.replace("_", " ")}</AlertTitle>
      <AlertDescription>
        {moduleItem.status === "contract_pending"
          ? "Frontend implementation is intentionally paused until endpoint contracts are fully confirmed for this module."
          : "This module currently exposes a shell-level experience only. Full workflows will be implemented in a later phase."}
      </AlertDescription>
    </Alert>
  );
}
