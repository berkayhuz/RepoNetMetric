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
  DealDetailDto,
  DealListItemDto,
  DealUpsertRequest,
  TicketDetailDto,
  TicketListItemDto,
  TicketUpdateRequest,
  TicketUpsertRequest,
  QuoteDetailDto,
  QuoteDateNoteRequest,
  QuoteDeclineRequest,
  QuoteListItemDto,
  QuoteNoteRequest,
  QuoteReasonRequest,
  QuoteUpdateRequest,
  QuoteUpsertRequest,
  CreateQuoteRevisionRequest,
  AssignDealOwnerRequest,
  DealOutcomeRequest,
  DealLostReasonDto,
  OpportunityDetailDto,
  OpportunityListItemDto,
  OpportunityUpdateRequest,
  OpportunityUpsertRequest,
  PipelineBoardDto,
  PipelineStageMoveRequest,
  PipelineStageMoveResultDto,
  PipelineDto,
  PipelineSummaryDto,
  WorkManagementWorkspaceDto,
  SupportInboxConnectionDto,
  SupportInboxMessageDto,
  TicketEscalationRunDto,
  TicketSlaEscalationRuleDto,
  TicketSlaPolicyDto,
  TicketSlaPolicyUpsertRequest,
  TicketSlaEscalationRuleUpsertRequest,
  TicketSlaWorkspaceDto,
  TicketWorkflowQueueDto,
  TicketWorkflowQueueUpsertRequest,
  TicketWorkflowQueueUpdateRequest,
  AssignTicketWorkflowQueueRequest,
  AssignTicketWorkflowOwnerRequest,
  RecordTicketWorkflowStatusChangeRequest,
  TicketAssignmentHistoryDto,
  TicketStatusHistoryDto,
  WorkTaskDto,
  MeetingScheduleDto,
  CreateWorkTaskRequest,
  ScheduleMeetingRequest,
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

  listOpportunities(query: CrmListQuery = {}, options: CrmApiRequestOptions = {}) {
    return request<unknown>({
      method: crmApiEndpoints.opportunitiesList.method,
      path: crmApiEndpoints.opportunitiesList.path,
      query: listQueryToRecord(query),
      ...options,
    }).then(normalizePagedResult<OpportunityListItemDto>);
  },

  listDeals(query: CrmListQuery = {}, options: CrmApiRequestOptions = {}) {
    return request<unknown>({
      method: crmApiEndpoints.dealsList.method,
      path: crmApiEndpoints.dealsList.path,
      query: listQueryToRecord(query),
      ...options,
    }).then(normalizePagedResult<DealListItemDto>);
  },

  listQuotes(query: CrmListQuery = {}, options: CrmApiRequestOptions = {}) {
    return request<unknown>({
      method: crmApiEndpoints.quotesList.method,
      path: crmApiEndpoints.quotesList.path,
      query: listQueryToRecord(query),
      ...options,
    }).then(normalizePagedResult<QuoteListItemDto>);
  },

  listTickets(query: CrmListQuery = {}, options: CrmApiRequestOptions = {}) {
    return request<unknown>({
      method: crmApiEndpoints.ticketsList.method,
      path: crmApiEndpoints.ticketsList.path,
      query: listQueryToRecord(query),
      ...options,
    }).then(normalizePagedResult<TicketListItemDto>);
  },

  getTicketById(ticketId: string, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.ticketsDetail(ticketId);
    return request<TicketDetailDto>({
      method: endpoint.method,
      path: endpoint.path,
      ...options,
    });
  },

  createTicket(input: TicketUpsertRequest, options: CrmApiRequestOptions = {}) {
    return request<TicketDetailDto>({
      method: crmApiEndpoints.ticketsCreate.method,
      path: crmApiEndpoints.ticketsCreate.path,
      body: input,
      ...options,
    });
  },

  updateTicket(ticketId: string, input: TicketUpdateRequest, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.ticketsUpdate(ticketId);
    return request<TicketDetailDto>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  deleteTicket(ticketId: string, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.ticketsDelete(ticketId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      ...options,
    });
  },

  getQuoteById(quoteId: string, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.quotesDetail(quoteId);
    return request<QuoteDetailDto>({
      method: endpoint.method,
      path: endpoint.path,
      ...options,
    });
  },

  createQuote(input: QuoteUpsertRequest, options: CrmApiRequestOptions = {}) {
    return request<QuoteDetailDto>({
      method: crmApiEndpoints.quotesCreate.method,
      path: crmApiEndpoints.quotesCreate.path,
      body: input,
      ...options,
    });
  },

  updateQuote(quoteId: string, input: QuoteUpdateRequest, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.quotesUpdate(quoteId);
    return request<QuoteDetailDto>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  deleteQuote(quoteId: string, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.quotesDelete(quoteId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      ...options,
    });
  },

  submitQuote(quoteId: string, input: QuoteNoteRequest, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.quotesSubmit(quoteId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  approveQuote(quoteId: string, input: QuoteNoteRequest, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.quotesApprove(quoteId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  rejectQuote(quoteId: string, input: QuoteReasonRequest, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.quotesReject(quoteId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  markQuoteSent(quoteId: string, input: QuoteDateNoteRequest, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.quotesMarkSent(quoteId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  acceptQuote(quoteId: string, input: QuoteDateNoteRequest, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.quotesAccept(quoteId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  declineQuote(quoteId: string, input: QuoteDeclineRequest, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.quotesDecline(quoteId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  expireQuote(quoteId: string, input: QuoteDateNoteRequest, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.quotesExpire(quoteId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  createQuoteRevision(
    quoteId: string,
    input: CreateQuoteRevisionRequest,
    options: CrmApiRequestOptions = {},
  ) {
    const endpoint = crmApiEndpoints.quotesCreateRevision(quoteId);
    return request<QuoteDetailDto>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  getDealById(dealId: string, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.dealsDetail(dealId);
    return request<DealDetailDto>({
      method: endpoint.method,
      path: endpoint.path,
      ...options,
    });
  },

  createDeal(input: DealUpsertRequest, options: CrmApiRequestOptions = {}) {
    return request<DealDetailDto>({
      method: crmApiEndpoints.dealsCreate.method,
      path: crmApiEndpoints.dealsCreate.path,
      body: input,
      ...options,
    });
  },

  updateDeal(dealId: string, input: DealUpsertRequest, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.dealsUpdate(dealId);
    return request<DealDetailDto>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  deleteDeal(dealId: string, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.dealsDelete(dealId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      ...options,
    });
  },

  assignDealOwner(
    dealId: string,
    input: AssignDealOwnerRequest,
    options: CrmApiRequestOptions = {},
  ) {
    const endpoint = crmApiEndpoints.dealsAssignOwner(dealId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  markDealWon(dealId: string, input: DealOutcomeRequest, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.dealsMarkWon(dealId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  markDealLost(dealId: string, input: DealOutcomeRequest, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.dealsMarkLost(dealId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  reopenDeal(dealId: string, input: DealOutcomeRequest, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.dealsReopen(dealId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  listDealLostReasons(options: CrmApiRequestOptions = {}) {
    return request<DealLostReasonDto[]>({
      method: crmApiEndpoints.dealsLostReasons.method,
      path: crmApiEndpoints.dealsLostReasons.path,
      ...options,
    });
  },

  getOpportunityById(opportunityId: string, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.opportunitiesDetail(opportunityId);
    return request<OpportunityDetailDto>({
      method: endpoint.method,
      path: endpoint.path,
      ...options,
    });
  },

  createOpportunity(input: OpportunityUpsertRequest, options: CrmApiRequestOptions = {}) {
    return request<OpportunityDetailDto>({
      method: crmApiEndpoints.opportunitiesCreate.method,
      path: crmApiEndpoints.opportunitiesCreate.path,
      body: input,
      ...options,
    });
  },

  updateOpportunity(
    opportunityId: string,
    input: OpportunityUpdateRequest,
    options: CrmApiRequestOptions = {},
  ) {
    const endpoint = crmApiEndpoints.opportunitiesUpdate(opportunityId);
    return request<OpportunityDetailDto>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  deleteOpportunity(opportunityId: string, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.opportunitiesDelete(opportunityId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      ...options,
    });
  },

  listPipelines(options: CrmApiRequestOptions = {}) {
    return request<PipelineSummaryDto[]>({
      method: crmApiEndpoints.pipelinesList.method,
      path: crmApiEndpoints.pipelinesList.path,
      ...options,
    });
  },

  getPipelineById(pipelineId: string, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.pipelinesDetail(pipelineId);
    return request<PipelineDto>({
      method: endpoint.method,
      path: endpoint.path,
      ...options,
    });
  },

  getPipelineBoard(
    pipelineId: string,
    query: { ownerUserId?: string } = {},
    options: CrmApiRequestOptions = {},
  ) {
    const endpoint = crmApiEndpoints.pipelinesBoard(pipelineId);
    return request<PipelineBoardDto>({
      method: endpoint.method,
      path: endpoint.path,
      ...(query.ownerUserId ? { query: { ownerUserId: query.ownerUserId } } : {}),
      ...options,
    });
  },

  moveOpportunityStage(
    opportunityId: string,
    input: PipelineStageMoveRequest,
    options: CrmApiRequestOptions = {},
  ) {
    const endpoint = crmApiEndpoints.pipelinesMoveOpportunityStage(opportunityId);
    return request<PipelineStageMoveResultDto>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  getWorkManagementWorkspace(options: CrmApiRequestOptions = {}) {
    return request<WorkManagementWorkspaceDto>({
      method: crmApiEndpoints.workManagementWorkspace.method,
      path: crmApiEndpoints.workManagementWorkspace.path,
      ...options,
    });
  },

  listSupportInboxConnections(options: CrmApiRequestOptions = {}) {
    return request<SupportInboxConnectionDto[]>({
      method: crmApiEndpoints.supportInboxConnectionsList.method,
      path: crmApiEndpoints.supportInboxConnectionsList.path,
      ...options,
    });
  },

  listSupportInboxMessages(
    query: {
      connectionId?: string;
      linkedToTicket?: boolean;
      page?: number;
      pageSize?: number;
    } = {},
    options: CrmApiRequestOptions = {},
  ) {
    return request<unknown>({
      method: crmApiEndpoints.supportInboxMessagesList.method,
      path: crmApiEndpoints.supportInboxMessagesList.path,
      query: {
        connectionId: query.connectionId,
        linkedToTicket: query.linkedToTicket,
        page: query.page,
        pageSize: query.pageSize,
      },
      ...options,
    }).then(normalizePagedResult<SupportInboxMessageDto>);
  },

  listTicketSlaPolicies(options: CrmApiRequestOptions = {}) {
    return request<TicketSlaPolicyDto[]>({
      method: crmApiEndpoints.ticketSlaPoliciesList.method,
      path: crmApiEndpoints.ticketSlaPoliciesList.path,
      ...options,
    });
  },

  createTicketSlaPolicy(input: TicketSlaPolicyUpsertRequest, options: CrmApiRequestOptions = {}) {
    return request<{ id: string }>({
      method: crmApiEndpoints.ticketSlaPolicyCreate.method,
      path: crmApiEndpoints.ticketSlaPolicyCreate.path,
      body: input,
      ...options,
    });
  },

  updateTicketSlaPolicy(
    policyId: string,
    input: TicketSlaPolicyUpsertRequest,
    options: CrmApiRequestOptions = {},
  ) {
    const endpoint = crmApiEndpoints.ticketSlaPolicyUpdate(policyId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  deleteTicketSlaPolicy(policyId: string, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.ticketSlaPolicyDelete(policyId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      ...options,
    });
  },

  listTicketSlaEscalationRules(policyId: string, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.ticketSlaPolicyEscalationRules(policyId);
    return request<TicketSlaEscalationRuleDto[]>({
      method: endpoint.method,
      path: endpoint.path,
      ...options,
    });
  },

  createTicketSlaEscalationRule(
    input: TicketSlaEscalationRuleUpsertRequest,
    options: CrmApiRequestOptions = {},
  ) {
    return request<{ id: string }>({
      method: crmApiEndpoints.ticketSlaEscalationRuleCreate.method,
      path: crmApiEndpoints.ticketSlaEscalationRuleCreate.path,
      body: input,
      ...options,
    });
  },

  updateTicketSlaEscalationRule(
    ruleId: string,
    input: TicketSlaEscalationRuleUpsertRequest,
    options: CrmApiRequestOptions = {},
  ) {
    const endpoint = crmApiEndpoints.ticketSlaEscalationRuleUpdate(ruleId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  getTicketSlaWorkspace(ticketId: string, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.ticketSlaWorkspace(ticketId);
    return request<TicketSlaWorkspaceDto>({
      method: endpoint.method,
      path: endpoint.path,
      ...options,
    });
  },

  listTicketEscalationRuns(ticketId: string, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.ticketSlaEscalationRuns(ticketId);
    return request<TicketEscalationRunDto[]>({
      method: endpoint.method,
      path: endpoint.path,
      ...options,
    });
  },

  listTicketWorkflowQueues(options: CrmApiRequestOptions = {}) {
    return request<TicketWorkflowQueueDto[]>({
      method: crmApiEndpoints.ticketWorkflowQueues.method,
      path: crmApiEndpoints.ticketWorkflowQueues.path,
      ...options,
    });
  },

  createTicketWorkflowQueue(
    input: TicketWorkflowQueueUpsertRequest,
    options: CrmApiRequestOptions = {},
  ) {
    return request<{ id: string }>({
      method: crmApiEndpoints.ticketWorkflowQueueCreate.method,
      path: crmApiEndpoints.ticketWorkflowQueueCreate.path,
      body: input,
      ...options,
    });
  },

  updateTicketWorkflowQueue(
    queueId: string,
    input: TicketWorkflowQueueUpdateRequest,
    options: CrmApiRequestOptions = {},
  ) {
    const endpoint = crmApiEndpoints.ticketWorkflowQueueUpdate(queueId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  deleteTicketWorkflowQueue(queueId: string, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.ticketWorkflowQueueDelete(queueId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      ...options,
    });
  },

  listTicketAssignmentHistory(ticketId: string, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.ticketWorkflowAssignmentHistory(ticketId);
    return request<TicketAssignmentHistoryDto[]>({
      method: endpoint.method,
      path: endpoint.path,
      ...options,
    });
  },

  listTicketStatusHistory(ticketId: string, options: CrmApiRequestOptions = {}) {
    const endpoint = crmApiEndpoints.ticketWorkflowStatusHistory(ticketId);
    return request<TicketStatusHistoryDto[]>({
      method: endpoint.method,
      path: endpoint.path,
      ...options,
    });
  },

  assignTicketWorkflowQueue(
    ticketId: string,
    input: AssignTicketWorkflowQueueRequest,
    options: CrmApiRequestOptions = {},
  ) {
    const endpoint = crmApiEndpoints.ticketWorkflowAssignQueue(ticketId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  assignTicketWorkflowOwner(
    ticketId: string,
    input: AssignTicketWorkflowOwnerRequest,
    options: CrmApiRequestOptions = {},
  ) {
    const endpoint = crmApiEndpoints.ticketWorkflowAssignOwner(ticketId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  recordTicketWorkflowStatusChange(
    ticketId: string,
    input: RecordTicketWorkflowStatusChangeRequest,
    options: CrmApiRequestOptions = {},
  ) {
    const endpoint = crmApiEndpoints.ticketWorkflowRecordStatusChange(ticketId);
    return request<void>({
      method: endpoint.method,
      path: endpoint.path,
      body: input,
      ...options,
    });
  },

  createWorkTask(input: CreateWorkTaskRequest, options: CrmApiRequestOptions = {}) {
    return request<WorkTaskDto>({
      method: crmApiEndpoints.workManagementCreateTask.method,
      path: crmApiEndpoints.workManagementCreateTask.path,
      body: input,
      ...options,
    });
  },

  scheduleWorkMeeting(input: ScheduleMeetingRequest, options: CrmApiRequestOptions = {}) {
    return request<MeetingScheduleDto>({
      method: crmApiEndpoints.workManagementScheduleMeeting.method,
      path: crmApiEndpoints.workManagementScheduleMeeting.path,
      body: input,
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
