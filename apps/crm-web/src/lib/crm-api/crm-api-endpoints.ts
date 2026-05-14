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

  addressesAddToCompany: (companyId: string) =>
    ({ method: "POST", path: `/api/addresses/companies/${companyId}` }) satisfies RouteDefinition,
  addressesAddToCustomer: (customerId: string) =>
    ({ method: "POST", path: `/api/addresses/customers/${customerId}` }) satisfies RouteDefinition,
  addressesUpdate: (addressId: string) =>
    ({ method: "PUT", path: `/api/addresses/${addressId}` }) satisfies RouteDefinition,
  addressesDelete: (addressId: string) =>
    ({ method: "DELETE", path: `/api/addresses/${addressId}` }) satisfies RouteDefinition,
} as const;
