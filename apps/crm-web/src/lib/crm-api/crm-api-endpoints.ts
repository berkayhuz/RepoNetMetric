import "server-only";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RouteDefinition = {
  method: HttpMethod;
  path: string;
};

export const crmApiEndpoints = {
  customersList: { method: "GET", path: "/api/customers" } satisfies RouteDefinition,
  customersDetail: (customerId: string) =>
    ({ method: "GET", path: `/api/customers/${customerId}` }) satisfies RouteDefinition,
  customersCreate: { method: "POST", path: "/api/customers" } satisfies RouteDefinition,
  customersUpdate: (customerId: string) =>
    ({ method: "PUT", path: `/api/customers/${customerId}` }) satisfies RouteDefinition,
  customersDelete: (customerId: string) =>
    ({ method: "DELETE", path: `/api/customers/${customerId}` }) satisfies RouteDefinition,

  companiesList: { method: "GET", path: "/api/companies" } satisfies RouteDefinition,
  companiesDetail: (companyId: string) =>
    ({ method: "GET", path: `/api/companies/${companyId}` }) satisfies RouteDefinition,
  companiesCreate: { method: "POST", path: "/api/companies" } satisfies RouteDefinition,
  companiesUpdate: (companyId: string) =>
    ({ method: "PUT", path: `/api/companies/${companyId}` }) satisfies RouteDefinition,
  companiesDelete: (companyId: string) =>
    ({ method: "DELETE", path: `/api/companies/${companyId}` }) satisfies RouteDefinition,

  contactsList: { method: "GET", path: "/api/contacts" } satisfies RouteDefinition,
  contactsDetail: (contactId: string) =>
    ({ method: "GET", path: `/api/contacts/${contactId}` }) satisfies RouteDefinition,
  contactsCreate: { method: "POST", path: "/api/contacts" } satisfies RouteDefinition,
  contactsUpdate: (contactId: string) =>
    ({ method: "PUT", path: `/api/contacts/${contactId}` }) satisfies RouteDefinition,
  contactsDelete: (contactId: string) =>
    ({ method: "DELETE", path: `/api/contacts/${contactId}` }) satisfies RouteDefinition,

  leadsList: { method: "GET", path: "/api/leads" } satisfies RouteDefinition,
  leadsDetail: (leadId: string) =>
    ({ method: "GET", path: `/api/leads/${leadId}` }) satisfies RouteDefinition,
  leadsCreate: { method: "POST", path: "/api/leads" } satisfies RouteDefinition,
  leadsUpdate: (leadId: string) =>
    ({ method: "PUT", path: `/api/leads/${leadId}` }) satisfies RouteDefinition,
  leadsDelete: (leadId: string) =>
    ({ method: "DELETE", path: `/api/leads/${leadId}` }) satisfies RouteDefinition,

  dealsList: { method: "GET", path: "/api/deals" } satisfies RouteDefinition,
  dealsDetail: (dealId: string) =>
    ({ method: "GET", path: `/api/deals/${dealId}` }) satisfies RouteDefinition,
  dealsCreate: { method: "POST", path: "/api/deals" } satisfies RouteDefinition,
  dealsUpdate: (dealId: string) =>
    ({ method: "PUT", path: `/api/deals/${dealId}` }) satisfies RouteDefinition,
  dealsDelete: (dealId: string) =>
    ({ method: "DELETE", path: `/api/deals/${dealId}` }) satisfies RouteDefinition,
  dealsAssignOwner: (dealId: string) =>
    ({ method: "PATCH", path: `/api/deals/${dealId}/owner` }) satisfies RouteDefinition,
  dealsMarkWon: (dealId: string) =>
    ({ method: "POST", path: `/api/deals/${dealId}/won` }) satisfies RouteDefinition,
  dealsMarkLost: (dealId: string) =>
    ({ method: "POST", path: `/api/deals/${dealId}/lost` }) satisfies RouteDefinition,
  dealsReopen: (dealId: string) =>
    ({ method: "POST", path: `/api/deals/${dealId}/reopen` }) satisfies RouteDefinition,
  dealsLostReasons: {
    method: "GET",
    path: "/api/deals/win-loss/lost-reasons",
  } satisfies RouteDefinition,

  quotesList: { method: "GET", path: "/api/quotes" } satisfies RouteDefinition,
  quotesDetail: (quoteId: string) =>
    ({ method: "GET", path: `/api/quotes/${quoteId}` }) satisfies RouteDefinition,
  quotesCreate: { method: "POST", path: "/api/quotes" } satisfies RouteDefinition,
  quotesUpdate: (quoteId: string) =>
    ({ method: "PUT", path: `/api/quotes/${quoteId}` }) satisfies RouteDefinition,
  quotesDelete: (quoteId: string) =>
    ({ method: "DELETE", path: `/api/quotes/${quoteId}` }) satisfies RouteDefinition,
  quotesSubmit: (quoteId: string) =>
    ({ method: "POST", path: `/api/quotes/${quoteId}/submit` }) satisfies RouteDefinition,
  quotesApprove: (quoteId: string) =>
    ({ method: "POST", path: `/api/quotes/${quoteId}/approve` }) satisfies RouteDefinition,
  quotesReject: (quoteId: string) =>
    ({ method: "POST", path: `/api/quotes/${quoteId}/reject` }) satisfies RouteDefinition,
  quotesMarkSent: (quoteId: string) =>
    ({ method: "POST", path: `/api/quotes/${quoteId}/sent` }) satisfies RouteDefinition,
  quotesAccept: (quoteId: string) =>
    ({ method: "POST", path: `/api/quotes/${quoteId}/accepted` }) satisfies RouteDefinition,
  quotesDecline: (quoteId: string) =>
    ({ method: "POST", path: `/api/quotes/${quoteId}/declined` }) satisfies RouteDefinition,
  quotesExpire: (quoteId: string) =>
    ({ method: "POST", path: `/api/quotes/${quoteId}/expired` }) satisfies RouteDefinition,
  quotesCreateRevision: (quoteId: string) =>
    ({ method: "POST", path: `/api/quotes/${quoteId}/revisions` }) satisfies RouteDefinition,

  ticketsList: { method: "GET", path: "/api/tickets" } satisfies RouteDefinition,
  ticketsDetail: (ticketId: string) =>
    ({ method: "GET", path: `/api/tickets/${ticketId}` }) satisfies RouteDefinition,
  ticketsCreate: { method: "POST", path: "/api/tickets" } satisfies RouteDefinition,
  ticketsUpdate: (ticketId: string) =>
    ({ method: "PUT", path: `/api/tickets/${ticketId}` }) satisfies RouteDefinition,
  ticketsDelete: (ticketId: string) =>
    ({ method: "DELETE", path: `/api/tickets/${ticketId}` }) satisfies RouteDefinition,

  opportunitiesList: { method: "GET", path: "/api/opportunities" } satisfies RouteDefinition,
  opportunitiesDetail: (opportunityId: string) =>
    ({ method: "GET", path: `/api/opportunities/${opportunityId}` }) satisfies RouteDefinition,
  opportunitiesCreate: { method: "POST", path: "/api/opportunities" } satisfies RouteDefinition,
  opportunitiesUpdate: (opportunityId: string) =>
    ({ method: "PUT", path: `/api/opportunities/${opportunityId}` }) satisfies RouteDefinition,
  opportunitiesDelete: (opportunityId: string) =>
    ({ method: "DELETE", path: `/api/opportunities/${opportunityId}` }) satisfies RouteDefinition,

  pipelinesList: { method: "GET", path: "/api/opportunities/pipelines" } satisfies RouteDefinition,
  pipelinesDetail: (pipelineId: string) =>
    ({
      method: "GET",
      path: `/api/opportunities/pipelines/${pipelineId}`,
    }) satisfies RouteDefinition,
  pipelinesBoard: (pipelineId: string) =>
    ({
      method: "GET",
      path: `/api/opportunities/pipelines/${pipelineId}/board`,
    }) satisfies RouteDefinition,
  pipelinesMoveOpportunityStage: (opportunityId: string) =>
    ({
      method: "POST",
      path: `/api/opportunities/pipelines/items/${opportunityId}/stage`,
    }) satisfies RouteDefinition,

  workManagementWorkspace: {
    method: "GET",
    path: "/api/work-management/workspace",
  } satisfies RouteDefinition,
  workManagementCreateTask: {
    method: "POST",
    path: "/api/work-management/tasks",
  } satisfies RouteDefinition,
  workManagementScheduleMeeting: {
    method: "POST",
    path: "/api/work-management/meetings",
  } satisfies RouteDefinition,

  supportInboxConnectionsList: {
    method: "GET",
    path: "/api/support-inbox/connections",
  } satisfies RouteDefinition,
  supportInboxMessagesList: {
    method: "GET",
    path: "/api/support-inbox/messages",
  } satisfies RouteDefinition,

  ticketSlaPoliciesList: {
    method: "GET",
    path: "/api/ticket-sla/policies",
  } satisfies RouteDefinition,
  ticketSlaPolicyCreate: {
    method: "POST",
    path: "/api/ticket-sla/policies",
  } satisfies RouteDefinition,
  ticketSlaPolicyUpdate: (policyId: string) =>
    ({
      method: "PUT",
      path: `/api/ticket-sla/policies/${policyId}`,
    }) satisfies RouteDefinition,
  ticketSlaPolicyDelete: (policyId: string) =>
    ({
      method: "DELETE",
      path: `/api/ticket-sla/policies/${policyId}`,
    }) satisfies RouteDefinition,
  ticketSlaPolicyEscalationRules: (policyId: string) =>
    ({
      method: "GET",
      path: `/api/ticket-sla/policies/${policyId}/escalation-rules`,
    }) satisfies RouteDefinition,
  ticketSlaEscalationRuleCreate: {
    method: "POST",
    path: "/api/ticket-sla/escalation-rules",
  } satisfies RouteDefinition,
  ticketSlaEscalationRuleUpdate: (ruleId: string) =>
    ({
      method: "PUT",
      path: `/api/ticket-sla/escalation-rules/${ruleId}`,
    }) satisfies RouteDefinition,
  ticketSlaWorkspace: (ticketId: string) =>
    ({
      method: "GET",
      path: `/api/ticket-sla/tickets/${ticketId}/workspace`,
    }) satisfies RouteDefinition,
  ticketSlaEscalationRuns: (ticketId: string) =>
    ({
      method: "GET",
      path: `/api/ticket-sla/tickets/${ticketId}/escalation-runs`,
    }) satisfies RouteDefinition,
  ticketWorkflowQueues: {
    method: "GET",
    path: "/api/ticket-workflow/queues",
  } satisfies RouteDefinition,
  ticketWorkflowQueueCreate: {
    method: "POST",
    path: "/api/ticket-workflow/queues",
  } satisfies RouteDefinition,
  ticketWorkflowQueueUpdate: (queueId: string) =>
    ({
      method: "PUT",
      path: `/api/ticket-workflow/queues/${queueId}`,
    }) satisfies RouteDefinition,
  ticketWorkflowQueueDelete: (queueId: string) =>
    ({
      method: "DELETE",
      path: `/api/ticket-workflow/queues/${queueId}`,
    }) satisfies RouteDefinition,
  ticketWorkflowAssignmentHistory: (ticketId: string) =>
    ({
      method: "GET",
      path: `/api/ticket-workflow/tickets/${ticketId}/assignments`,
    }) satisfies RouteDefinition,
  ticketWorkflowStatusHistory: (ticketId: string) =>
    ({
      method: "GET",
      path: `/api/ticket-workflow/tickets/${ticketId}/status-history`,
    }) satisfies RouteDefinition,
  ticketWorkflowAssignQueue: (ticketId: string) =>
    ({
      method: "PATCH",
      path: `/api/ticket-workflow/tickets/${ticketId}/queue`,
    }) satisfies RouteDefinition,
  ticketWorkflowAssignOwner: (ticketId: string) =>
    ({
      method: "PATCH",
      path: `/api/ticket-workflow/tickets/${ticketId}/owner`,
    }) satisfies RouteDefinition,
  ticketWorkflowRecordStatusChange: (ticketId: string) =>
    ({
      method: "POST",
      path: `/api/ticket-workflow/tickets/${ticketId}/status-history`,
    }) satisfies RouteDefinition,

  addressesAddToCompany: (companyId: string) =>
    ({ method: "POST", path: `/api/addresses/companies/${companyId}` }) satisfies RouteDefinition,
  addressesAddToCustomer: (customerId: string) =>
    ({ method: "POST", path: `/api/addresses/customers/${customerId}` }) satisfies RouteDefinition,
  addressesUpdate: (addressId: string) =>
    ({ method: "PUT", path: `/api/addresses/${addressId}` }) satisfies RouteDefinition,
  addressesDelete: (addressId: string) =>
    ({ method: "DELETE", path: `/api/addresses/${addressId}` }) satisfies RouteDefinition,
} as const;
