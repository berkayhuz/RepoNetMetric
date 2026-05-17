export const crmCapabilityNames = [
  "customers.read",
  "customers.create",
  "customers.edit",
  "customers.delete",
  "customers.duplicates.review",
  "companies.read",
  "companies.create",
  "companies.edit",
  "companies.delete",
  "contacts.read",
  "contacts.create",
  "contacts.edit",
  "contacts.delete",
  "leads.read",
  "leads.create",
  "leads.edit",
  "leads.delete",
  "canCreateLead",
  "deals.read",
  "deals.create",
  "deals.edit",
  "deals.delete",
  "canEditDeal",
  "opportunities.read",
  "opportunities.create",
  "opportunities.edit",
  "opportunities.delete",
  "canDeleteOpportunity",
  "quotes.read",
  "quotes.create",
  "quotes.edit",
  "quotes.delete",
  "tickets.read",
  "tickets.create",
  "tickets.edit",
  "tickets.delete",
  "supportInbox.read",
  "ticketSla.read",
  "ticketSla.manage",
  "ticketWorkflow.read",
  "ticketWorkflow.manage",
  "pipeline.read",
  "pipeline.manage",
  "tasks.read",
  "tasks.create",
  "canExportCustomer",
  "canImportCustomer",
] as const;

export type CrmCapability = (typeof crmCapabilityNames)[number];
export type CrmCapabilities = Record<CrmCapability, boolean>;

const permissionAliases: Record<CrmCapability, readonly string[]> = {
  "customers.read": [
    "customers.read",
    "crm.customer-management.customers.read",
    "crm.customer-management.customers.manage",
  ],
  "customers.create": [
    "customers.write",
    "customers.manage",
    "crm.customer-management.customers.manage",
  ],
  "customers.edit": [
    "customers.write",
    "customers.manage",
    "crm.customer-management.customers.manage",
  ],
  "customers.delete": [
    "customers.delete",
    "customers.manage",
    "crm.customer-management.customers.manage",
  ],
  "customers.duplicates.review": [
    "customer-intelligence.duplicates.read",
    "customer-intelligence.duplicates.manage",
    "customers.manage",
    "crm.customer-management.customers.manage",
  ],
  "companies.read": [
    "companies.read",
    "crm.customer-management.companies.read",
    "crm.customer-management.companies.manage",
  ],
  "companies.create": ["companies.manage", "crm.customer-management.companies.manage"],
  "companies.edit": ["companies.manage", "crm.customer-management.companies.manage"],
  "companies.delete": ["companies.manage", "crm.customer-management.companies.manage"],
  "contacts.read": [
    "contacts.read",
    "crm.customer-management.contacts.read",
    "crm.customer-management.contacts.manage",
  ],
  "contacts.create": ["contacts.manage", "crm.customer-management.contacts.manage"],
  "contacts.edit": ["contacts.manage", "crm.customer-management.contacts.manage"],
  "contacts.delete": ["contacts.manage", "crm.customer-management.contacts.manage"],
  "leads.read": ["leads.read"],
  "leads.create": ["leads.manage"],
  "leads.edit": ["leads.manage"],
  "leads.delete": ["leads.manage"],
  canCreateLead: ["leads.create", "leads.manage"],
  "deals.read": ["deals.read"],
  "deals.create": ["deals.manage"],
  "deals.edit": ["deals.manage"],
  "deals.delete": ["deals.manage"],
  canEditDeal: ["deals.edit", "deals.manage"],
  "opportunities.read": ["opportunities.read"],
  "opportunities.create": ["opportunities.manage"],
  "opportunities.edit": ["opportunities.manage"],
  "opportunities.delete": ["opportunities.manage"],
  canDeleteOpportunity: ["opportunities.delete", "opportunities.manage"],
  "quotes.read": ["quotes.read"],
  "quotes.create": ["quotes.manage"],
  "quotes.edit": ["quotes.manage"],
  "quotes.delete": ["quotes.manage"],
  "tickets.read": ["tickets.read"],
  "tickets.create": ["tickets.manage"],
  "tickets.edit": ["tickets.manage"],
  "tickets.delete": ["tickets.manage"],
  "supportInbox.read": [
    "support-inbox.connections.read",
    "support-inbox.rules.read",
    "support-inbox.messages.read",
    "crm.inbox.read",
  ],
  "ticketSla.read": ["ticket.sla-policies.read", "ticket.sla-policies.manage"],
  "ticketSla.manage": ["ticket.sla-policies.manage"],
  "ticketWorkflow.read": [
    "ticket.queues.read",
    "ticket.queues.manage",
    "ticket.assignments.read",
    "ticket.status-history.read",
  ],
  "ticketWorkflow.manage": ["ticket.queues.manage"],
  "pipeline.read": ["pipeline.pipelines.read", "pipeline.pipelines.manage"],
  "pipeline.manage": ["pipeline.pipelines.manage"],
  "tasks.read": ["tasks.read", "work-management.tasks.read", "work-management.tasks.manage"],
  "tasks.create": ["tasks.manage", "work-management.tasks.manage"],
  canExportCustomer: [
    "customers.export",
    "customers.manage",
    "crm.customer-management.customers.export",
    "crm.customer-management.customers.manage",
  ],
  canImportCustomer: [
    "customers.import",
    "customers.manage",
    "crm.customer-management.customers.import",
    "crm.customer-management.customers.manage",
  ],
};

export const emptyCrmCapabilities: CrmCapabilities = Object.fromEntries(
  crmCapabilityNames.map((capability) => [capability, false]),
) as CrmCapabilities;

export function createCrmCapabilities(permissions: readonly string[]): CrmCapabilities {
  const normalizedPermissions = new Set(
    permissions.map((permission) => permission.trim().toLowerCase()).filter(Boolean),
  );
  const allowAll = normalizedPermissions.has("*");

  return Object.fromEntries(
    crmCapabilityNames.map((capability) => [
      capability,
      allowAll ||
        permissionAliases[capability].some((permission) =>
          normalizedPermissions.has(permission.toLowerCase()),
        ),
    ]),
  ) as CrmCapabilities;
}

export function crmCapabilityAllows(
  capabilities: CrmCapabilities | null | undefined,
  capability: CrmCapability | null | undefined,
): boolean {
  if (!capability) {
    return true;
  }

  return capabilities?.[capability] === true;
}

const crmEntityPathCapabilities = {
  customers: "customers",
  companies: "companies",
  contacts: "contacts",
  leads: "leads",
  deals: "deals",
  opportunities: "opportunities",
  quotes: "quotes",
  tickets: "tickets",
} as const;

type CrmEntityPathSegment = keyof typeof crmEntityPathCapabilities;

function normalizeCrmPath(pathname: string): string[] {
  const cleanPath = pathname.split(/[?#]/, 1)[0]?.replace(/\/+$/, "") || "/";
  return cleanPath.split("/").filter(Boolean);
}

export function getRequiredCrmCapabilityForPath(pathname: string): CrmCapability | null {
  const [firstSegment, secondSegment, thirdSegment] = normalizeCrmPath(pathname);

  if (!firstSegment || firstSegment === "dashboard") {
    return null;
  }

  if (firstSegment === "tasks") {
    return [secondSegment, thirdSegment].includes("new") ? "tasks.create" : "tasks.read";
  }

  if (firstSegment === "support-inbox") {
    return "supportInbox.read";
  }

  if (firstSegment === "ticket-sla") {
    return "ticketSla.read";
  }

  if (firstSegment === "ticket-workflows") {
    return "ticketWorkflow.read";
  }

  if (firstSegment === "pipeline") {
    return "pipeline.read";
  }

  if (firstSegment === "work-management") {
    return "tasks.read";
  }

  const entity = crmEntityPathCapabilities[firstSegment as CrmEntityPathSegment];
  if (!entity) {
    return null;
  }

  if (secondSegment === "new") {
    return `${entity}.create` as CrmCapability;
  }

  if (thirdSegment === "edit") {
    return `${entity}.edit` as CrmCapability;
  }

  return `${entity}.read` as CrmCapability;
}
