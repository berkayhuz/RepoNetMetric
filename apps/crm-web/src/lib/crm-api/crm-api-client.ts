import "server-only";

import { getCrmApiConfig, joinCrmApiPath } from "./crm-api-config";
import { applyCorrelationId, getCorrelationIdFromHeaders } from "./correlation";
import { CrmApiError, statusToCrmApiErrorKind } from "./crm-api-errors";
import { crmApiEndpoints } from "./crm-api-endpoints";
import { listQueryToSearchParams } from "./query-model";
import { normalizeProblemDetails } from "./problem-details";
import type {
  AddressDto,
  AddressUpsertRequest,
  CompanyDetailDto,
  CompanyListItemDto,
  CompanyUpsertRequest,
  ContactDetailDto,
  ContactListItemDto,
  ContactUpsertRequest,
  CrmPagedResult,
  CrmApiAuthContext,
  CrmApiRequestOptions,
  CrmListQuery,
  CustomerDetailDto,
  CustomerListItemDto,
  CustomerUpsertRequest,
  HttpMethod,
  LeadDetailDto,
  LeadListItemDto,
  LeadUpdateRequest,
  LeadUpsertRequest,
} from "./crm-api-types";

type RequestOptions = CrmApiRequestOptions & {
  method: HttpMethod;
  path: string;
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
  contentType?: string;
};

function withQuery(
  path: string,
  query: Record<string, string | number | boolean | undefined>,
): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined) {
      continue;
    }

    params.set(key, String(value));
  }

  const suffix = params.toString();
  return suffix ? `${path}?${suffix}` : path;
}

function readBodyAsJson(body: unknown, contentType?: string): BodyInit | undefined {
  if (body === undefined) {
    return undefined;
  }

  if (body instanceof FormData) {
    return body;
  }

  if (contentType && contentType !== "application/json") {
    return body as BodyInit;
  }

  return JSON.stringify(body);
}

async function parseResponsePayload(response: Response): Promise<unknown> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function buildHeaders(
  authContext: CrmApiAuthContext | undefined,
  correlationId: string | undefined,
): Headers {
  const headers = new Headers();
  headers.set("accept", "application/json");

  if (authContext?.bearerToken) {
    headers.set("authorization", `Bearer ${authContext.bearerToken}`);
  }

  applyCorrelationId(headers, correlationId);
  return headers;
}

function createTimeoutSignal(timeoutMs: number, parentSignal?: AbortSignal): AbortSignal {
  const timeoutSignal = AbortSignal.timeout(timeoutMs);

  if (!parentSignal) {
    return timeoutSignal;
  }

  if (parentSignal.aborted) {
    return parentSignal;
  }

  const controller = new AbortController();
  const abort = () => controller.abort();

  parentSignal.addEventListener("abort", abort, { once: true });
  timeoutSignal.addEventListener("abort", abort, { once: true });

  return controller.signal;
}

async function request<TResponse>(options: RequestOptions): Promise<TResponse> {
  const pathWithQuery = options.query ? withQuery(options.path, options.query) : options.path;
  const requestUrl = joinCrmApiPath(pathWithQuery);
  const correlationId = options.correlationId;
  const headers = buildHeaders(options.authContext, correlationId);
  const body = readBodyAsJson(options.body, options.contentType);

  if (body && !options.contentType && !(body instanceof FormData)) {
    headers.set("content-type", "application/json");
  } else if (options.contentType) {
    headers.set("content-type", options.contentType);
  }

  const signal = createTimeoutSignal(
    options.timeoutMs ?? getCrmApiConfig().defaultTimeoutMs,
    options.signal,
  );

  const requestInit: RequestInit = {
    method: options.method,
    headers,
    cache: "no-store",
    signal,
    redirect: "manual",
  };

  if (body !== undefined) {
    requestInit.body = body;
  }

  let response: Response;
  try {
    response = await fetch(requestUrl, requestInit);
  } catch {
    const errorInput: ConstructorParameters<typeof CrmApiError>[0] = {
      message: "CRM API is unavailable.",
      status: 503,
      kind: "upstream_unavailable",
    };
    if (correlationId) {
      errorInput.correlationId = correlationId;
    }
    throw new CrmApiError(errorInput);
  }

  const payload = await parseResponsePayload(response);
  const responseCorrelationId = getCorrelationIdFromHeaders(response.headers) ?? correlationId;

  if (!response.ok) {
    const problem = normalizeProblemDetails(payload);

    const errorInput: ConstructorParameters<typeof CrmApiError>[0] = {
      message: problem?.detail ?? problem?.title ?? "CRM API request failed.",
      status: response.status,
      kind: statusToCrmApiErrorKind(response.status),
    };

    if (problem) {
      errorInput.problem = problem;
    }

    if (responseCorrelationId) {
      errorInput.correlationId = responseCorrelationId;
    }

    throw new CrmApiError(errorInput);
  }

  if (response.status === 204 || payload === null) {
    return undefined as TResponse;
  }

  return payload as TResponse;
}

function normalizePagedResult<TItem>(payload: unknown): CrmPagedResult<TItem> {
  const fallback: CrmPagedResult<TItem> = {
    items: [],
    totalCount: 0,
    pageNumber: 1,
    pageSize: 20,
    totalPages: 0,
  };

  if (!payload || typeof payload !== "object") {
    return fallback;
  }

  const candidate = payload as Record<string, unknown>;
  const items = Array.isArray(candidate.items) ? (candidate.items as TItem[]) : fallback.items;
  const totalCount =
    typeof candidate.totalCount === "number" ? candidate.totalCount : fallback.totalCount;
  const pageNumber =
    typeof candidate.pageNumber === "number" ? candidate.pageNumber : fallback.pageNumber;
  const pageSize = typeof candidate.pageSize === "number" ? candidate.pageSize : fallback.pageSize;
  const totalPages =
    typeof candidate.totalPages === "number"
      ? candidate.totalPages
      : pageSize > 0
        ? Math.ceil(totalCount / pageSize)
        : 0;

  return {
    items,
    totalCount,
    pageNumber,
    pageSize,
    totalPages,
  };
}

function listQueryToRecord(
  query?: CrmListQuery,
): Record<string, string | number | boolean | undefined> {
  if (!query) {
    return {};
  }

  const params = listQueryToSearchParams(query);
  return Object.fromEntries(params.entries());
}

export const crmApiClient = {
  listCustomers(query: CrmListQuery = {}, options: CrmApiRequestOptions = {}) {
    return request<unknown>({
      method: crmApiEndpoints.customersList.method,
      path: crmApiEndpoints.customersList.path,
      query: listQueryToRecord(query),
      ...options,
    }).then(normalizePagedResult<CustomerListItemDto>);
  },

  getCustomerById(customerId: string, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.customersDetail(customerId);
    return request<CustomerDetailDto>({
      method: endpoint.method,
      path: endpoint.path,
      ...options,
    });
  },

  createCustomer(input: CustomerUpsertRequest, options: CrmApiRequestOptions = {}) {
    return request<CustomerDetailDto>({
      method: crmApiEndpoints.customersCreate.method,
      path: crmApiEndpoints.customersCreate.path,
      body: input,
      ...options,
    });
  },

  updateCustomer(
    customerId: string,
    input: CustomerUpsertRequest,
    options: CrmApiRequestOptions = {},
  ) {
    const endpoint = crmApiEndpoints.customersUpdate(customerId);
    return request<CustomerDetailDto>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  deleteCustomer(customerId: string, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.customersDelete(customerId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      ...options,
    });
  },

  listCompanies(query: CrmListQuery = {}, options: CrmApiRequestOptions = {}) {
    return request<unknown>({
      method: crmApiEndpoints.companiesList.method,
      path: crmApiEndpoints.companiesList.path,
      query: listQueryToRecord(query),
      ...options,
    }).then(normalizePagedResult<CompanyListItemDto>);
  },

  getCompanyById(companyId: string, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.companiesDetail(companyId);
    return request<CompanyDetailDto>({
      method: endpoint.method,
      path: endpoint.path,
      ...options,
    });
  },

  createCompany(input: CompanyUpsertRequest, options: CrmApiRequestOptions = {}) {
    return request<CompanyDetailDto>({
      method: crmApiEndpoints.companiesCreate.method,
      path: crmApiEndpoints.companiesCreate.path,
      body: input,
      ...options,
    });
  },

  updateCompany(
    companyId: string,
    input: CompanyUpsertRequest,
    options: CrmApiRequestOptions = {},
  ) {
    const endpoint = crmApiEndpoints.companiesUpdate(companyId);
    return request<CompanyDetailDto>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  deleteCompany(companyId: string, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.companiesDelete(companyId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      ...options,
    });
  },

  listContacts(query: CrmListQuery = {}, options: CrmApiRequestOptions = {}) {
    return request<unknown>({
      method: crmApiEndpoints.contactsList.method,
      path: crmApiEndpoints.contactsList.path,
      query: listQueryToRecord(query),
      ...options,
    }).then(normalizePagedResult<ContactListItemDto>);
  },

  getContactById(contactId: string, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.contactsDetail(contactId);
    return request<ContactDetailDto>({
      method: endpoint.method,
      path: endpoint.path,
      ...options,
    });
  },

  listLeads(query: CrmListQuery = {}, options: CrmApiRequestOptions = {}) {
    return request<unknown>({
      method: crmApiEndpoints.leadsList.method,
      path: crmApiEndpoints.leadsList.path,
      query: listQueryToRecord(query),
      ...options,
    }).then(normalizePagedResult<LeadListItemDto>);
  },

  getLeadById(leadId: string, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.leadsDetail(leadId);
    return request<LeadDetailDto>({
      method: endpoint.method,
      path: endpoint.path,
      ...options,
    });
  },

  createLead(input: LeadUpsertRequest, options: CrmApiRequestOptions = {}) {
    return request<LeadDetailDto>({
      method: crmApiEndpoints.leadsCreate.method,
      path: crmApiEndpoints.leadsCreate.path,
      body: input,
      ...options,
    });
  },

  updateLead(leadId: string, input: LeadUpdateRequest, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.leadsUpdate(leadId);
    return request<LeadDetailDto>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  deleteLead(leadId: string, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.leadsDelete(leadId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      ...options,
    });
  },

  createContact(input: ContactUpsertRequest, options: CrmApiRequestOptions = {}) {
    return request<ContactDetailDto>({
      method: crmApiEndpoints.contactsCreate.method,
      path: crmApiEndpoints.contactsCreate.path,
      body: input,
      ...options,
    });
  },

  updateContact(
    contactId: string,
    input: ContactUpsertRequest,
    options: CrmApiRequestOptions = {},
  ) {
    const endpoint = crmApiEndpoints.contactsUpdate(contactId);
    return request<ContactDetailDto>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  deleteContact(contactId: string, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.contactsDelete(contactId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      ...options,
    });
  },

  addAddressToCompany(
    companyId: string,
    input: AddressUpsertRequest,
    options: CrmApiRequestOptions = {},
  ) {
    const endpoint = crmApiEndpoints.addressesAddToCompany(companyId);
    return request<AddressDto>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  addAddressToCustomer(
    customerId: string,
    input: AddressUpsertRequest,
    options: CrmApiRequestOptions = {},
  ) {
    const endpoint = crmApiEndpoints.addressesAddToCustomer(customerId);
    return request<AddressDto>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  updateAddress(
    addressId: string,
    input: AddressUpsertRequest,
    options: CrmApiRequestOptions = {},
  ) {
    const endpoint = crmApiEndpoints.addressesUpdate(addressId);
    return request<AddressDto>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  deleteAddress(addressId: string, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.addressesDelete(addressId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      ...options,
    });
  },
};
