import type { CrmCapabilities, CrmCapability } from "@/lib/crm-auth/crm-capabilities";
import { crmCapabilityAllows } from "@/lib/crm-auth/crm-capabilities";

export type CrmModuleStatus = "active" | "read_only" | "contract_pending" | "coming_soon";
export type CrmModuleGroup =
  | "core"
  | "sales"
  | "service_support"
  | "marketing"
  | "operations"
  | "intelligence_ai"
  | "administration";

type CrmModuleTextKey = `crm.modules.${string}.${"title" | "description" | "implementationPhase"}`;

export type CrmModuleRegistryItem = {
  id: string;
  titleKey: CrmModuleTextKey;
  descriptionKey: CrmModuleTextKey;
  implementationPhaseKey: CrmModuleTextKey;
  path: string;
  group: CrmModuleGroup;
  iconKey: string;
  status: CrmModuleStatus;
  backendModuleFolder: string;
  endpointDiscoveryStatus: "source_visible" | "contract_pending" | "coming_soon";
};

function moduleTextKeys(
  id: string,
): Pick<CrmModuleRegistryItem, "titleKey" | "descriptionKey" | "implementationPhaseKey"> {
  return {
    titleKey: `crm.modules.${id}.title`,
    descriptionKey: `crm.modules.${id}.description`,
    implementationPhaseKey: `crm.modules.${id}.implementationPhase`,
  };
}

export const crmModuleRegistry: CrmModuleRegistryItem[] = [
  {
    id: "dashboard",
    ...moduleTextKeys("dashboard"),
    path: "/dashboard",
    group: "core",
    iconKey: "layout-dashboard",
    status: "read_only",
    backendModuleFolder: "AnalyticsReporting",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "customers",
    ...moduleTextKeys("customers"),
    path: "/customers",
    group: "core",
    iconKey: "users",
    status: "active",
    backendModuleFolder: "CustomerManagement",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "companies",
    ...moduleTextKeys("companies"),
    path: "/companies",
    group: "core",
    iconKey: "building-2",
    status: "active",
    backendModuleFolder: "CustomerManagement",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "contacts",
    ...moduleTextKeys("contacts"),
    path: "/contacts",
    group: "core",
    iconKey: "contact",
    status: "active",
    backendModuleFolder: "CustomerManagement",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "customer-intelligence",
    ...moduleTextKeys("customer-intelligence"),
    path: "/customer-intelligence",
    group: "core",
    iconKey: "sparkles",
    status: "contract_pending",
    backendModuleFolder: "CustomerIntelligence",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "lead-management",
    ...moduleTextKeys("lead-management"),
    path: "/leads",
    group: "sales",
    iconKey: "user-plus",
    status: "active",
    backendModuleFolder: "LeadManagement",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "deal-management",
    ...moduleTextKeys("deal-management"),
    path: "/deals",
    group: "sales",
    iconKey: "handshake",
    status: "active",
    backendModuleFolder: "DealManagement",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "opportunity-management",
    ...moduleTextKeys("opportunity-management"),
    path: "/opportunities",
    group: "sales",
    iconKey: "target",
    status: "active",
    backendModuleFolder: "OpportunityManagement",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "pipeline-management",
    ...moduleTextKeys("pipeline-management"),
    path: "/pipeline",
    group: "sales",
    iconKey: "git-branch",
    status: "active",
    backendModuleFolder: "PipelineManagement",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "quote-management",
    ...moduleTextKeys("quote-management"),
    path: "/quotes",
    group: "sales",
    iconKey: "file-text",
    status: "active",
    backendModuleFolder: "QuoteManagement",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "sales-forecasting",
    ...moduleTextKeys("sales-forecasting"),
    path: "/sales-forecasting",
    group: "sales",
    iconKey: "trending-up",
    status: "contract_pending",
    backendModuleFolder: "SalesForecasting",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "product-catalog",
    ...moduleTextKeys("product-catalog"),
    path: "/product-catalog",
    group: "sales",
    iconKey: "package",
    status: "contract_pending",
    backendModuleFolder: "ProductCatalog",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "support-inbox",
    ...moduleTextKeys("support-inbox"),
    path: "/support-inbox",
    group: "service_support",
    iconKey: "inbox",
    status: "read_only",
    backendModuleFolder: "SupportInboxIntegration",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "ticket-management",
    ...moduleTextKeys("ticket-management"),
    path: "/tickets",
    group: "service_support",
    iconKey: "ticket",
    status: "active",
    backendModuleFolder: "TicketManagement",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "ticket-sla",
    ...moduleTextKeys("ticket-sla"),
    path: "/ticket-sla",
    group: "service_support",
    iconKey: "alarm-clock",
    status: "active",
    backendModuleFolder: "TicketSlaManagement",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "ticket-workflow",
    ...moduleTextKeys("ticket-workflow"),
    path: "/ticket-workflows",
    group: "service_support",
    iconKey: "shuffle",
    status: "active",
    backendModuleFolder: "TicketWorkflowManagement",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "marketing-automation",
    ...moduleTextKeys("marketing-automation"),
    path: "/marketing",
    group: "marketing",
    iconKey: "megaphone",
    status: "contract_pending",
    backendModuleFolder: "MarketingAutomation",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "omnichannel",
    ...moduleTextKeys("omnichannel"),
    path: "/omnichannel",
    group: "marketing",
    iconKey: "messages-square",
    status: "contract_pending",
    backendModuleFolder: "Omnichannel",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "calendar-sync",
    ...moduleTextKeys("calendar-sync"),
    path: "/calendar-sync",
    group: "operations",
    iconKey: "calendar",
    status: "contract_pending",
    backendModuleFolder: "CalendarSync",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "contract-lifecycle",
    ...moduleTextKeys("contract-lifecycle"),
    path: "/contracts",
    group: "operations",
    iconKey: "file-signature",
    status: "contract_pending",
    backendModuleFolder: "ContractLifecycle",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "document-management",
    ...moduleTextKeys("document-management"),
    path: "/documents",
    group: "operations",
    iconKey: "folder-open",
    status: "contract_pending",
    backendModuleFolder: "DocumentManagement",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "finance-operations",
    ...moduleTextKeys("finance-operations"),
    path: "/finance",
    group: "operations",
    iconKey: "wallet",
    status: "contract_pending",
    backendModuleFolder: "FinanceOperations",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "integration-hub",
    ...moduleTextKeys("integration-hub"),
    path: "/integrations",
    group: "operations",
    iconKey: "plug",
    status: "contract_pending",
    backendModuleFolder: "IntegrationHub",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "knowledge-base",
    ...moduleTextKeys("knowledge-base"),
    path: "/knowledge-base",
    group: "operations",
    iconKey: "book-open",
    status: "contract_pending",
    backendModuleFolder: "KnowledgeBaseManagement",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "work-management",
    ...moduleTextKeys("work-management"),
    path: "/work-management",
    group: "operations",
    iconKey: "list-checks",
    status: "active",
    backendModuleFolder: "WorkManagement",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "workflow-automation",
    ...moduleTextKeys("workflow-automation"),
    path: "/workflows",
    group: "operations",
    iconKey: "workflow",
    status: "contract_pending",
    backendModuleFolder: "WorkflowAutomation",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "analytics-reporting",
    ...moduleTextKeys("analytics-reporting"),
    path: "/analytics",
    group: "intelligence_ai",
    iconKey: "bar-chart-3",
    status: "contract_pending",
    backendModuleFolder: "AnalyticsReporting",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "artificial-intelligence",
    ...moduleTextKeys("artificial-intelligence"),
    path: "/ai",
    group: "intelligence_ai",
    iconKey: "bot",
    status: "contract_pending",
    backendModuleFolder: "ArtificialIntelligence",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "tag-management",
    ...moduleTextKeys("tag-management"),
    path: "/tags",
    group: "administration",
    iconKey: "tags",
    status: "contract_pending",
    backendModuleFolder: "TagManagement",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "tenant-management",
    ...moduleTextKeys("tenant-management"),
    path: "/tenants",
    group: "administration",
    iconKey: "shield",
    status: "contract_pending",
    backendModuleFolder: "TenantManagement",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "tasks",
    ...moduleTextKeys("tasks"),
    path: "/tasks",
    group: "operations",
    iconKey: "check-square",
    status: "active",
    backendModuleFolder: "WorkManagement",
    endpointDiscoveryStatus: "source_visible",
  },
  {
    id: "activities",
    ...moduleTextKeys("activities"),
    path: "/activities",
    group: "operations",
    iconKey: "activity",
    status: "contract_pending",
    backendModuleFolder: "WorkManagement",
    endpointDiscoveryStatus: "contract_pending",
  },
  {
    id: "settings",
    ...moduleTextKeys("settings"),
    path: "/settings",
    group: "administration",
    iconKey: "settings",
    status: "coming_soon",
    backendModuleFolder: "TenantManagement",
    endpointDiscoveryStatus: "coming_soon",
  },
];

export const crmModuleGroups: CrmModuleGroup[] = [
  "core",
  "sales",
  "service_support",
  "marketing",
  "operations",
  "intelligence_ai",
  "administration",
];

export function getCrmModuleByPath(path: string): CrmModuleRegistryItem | undefined {
  return crmModuleRegistry.find((moduleItem) => moduleItem.path === path);
}

export function getCrmModuleById(id: string): CrmModuleRegistryItem | undefined {
  return crmModuleRegistry.find((moduleItem) => moduleItem.id === id);
}

export function getCrmModulesByGroup(group: CrmModuleGroup): CrmModuleRegistryItem[] {
  return crmModuleRegistry.filter((moduleItem) => moduleItem.group === group);
}

export function isCrmModuleNavigable(moduleItem: CrmModuleRegistryItem): boolean {
  return moduleItem.status === "active" || moduleItem.status === "read_only";
}

export function getCrmModuleRequiredCapability(
  moduleItem: CrmModuleRegistryItem,
): CrmCapability | null {
  switch (moduleItem.id) {
    case "customers":
      return "customers.read";
    case "companies":
      return "companies.read";
    case "contacts":
      return "contacts.read";
    case "lead-management":
      return "leads.read";
    case "deal-management":
      return "deals.read";
    case "opportunity-management":
      return "opportunities.read";
    case "quote-management":
      return "quotes.read";
    case "support-inbox":
      return "supportInbox.read";
    case "ticket-management":
      return "tickets.read";
    case "ticket-sla":
      return "ticketSla.read";
    case "ticket-workflow":
      return "ticketWorkflow.read";
    case "pipeline-management":
      return "pipeline.read";
    case "work-management":
    case "tasks":
      return "tasks.read";
    default:
      return null;
  }
}

export function canNavigateCrmModule(
  moduleItem: CrmModuleRegistryItem,
  capabilities: CrmCapabilities | null | undefined,
): boolean {
  return (
    isCrmModuleNavigable(moduleItem) &&
    crmCapabilityAllows(capabilities, getCrmModuleRequiredCapability(moduleItem))
  );
}
