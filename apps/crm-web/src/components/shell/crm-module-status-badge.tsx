import { Badge } from "@netmetric/ui";

import type { CrmModuleStatus } from "@/features/modules/module-registry";

const statusConfig: Record<
  CrmModuleStatus,
  { label: string; variant: "default" | "secondary" | "outline" }
> = {
  active: { label: "Active", variant: "default" },
  read_only: { label: "Read only", variant: "secondary" },
  contract_pending: { label: "Contract pending", variant: "outline" },
  coming_soon: { label: "Coming soon", variant: "outline" },
};

export function CrmModuleStatusBadge({ status }: Readonly<{ status: CrmModuleStatus }>) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
