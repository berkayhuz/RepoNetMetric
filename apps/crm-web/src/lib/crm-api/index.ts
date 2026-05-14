export { crmApiClient } from "./crm-api-client";
export { getCrmApiConfig, joinCrmApiPath } from "./crm-api-config";
export { crmApiEndpoints } from "./crm-api-endpoints";
export { CrmApiError, statusToCrmApiErrorKind, type CrmApiErrorKind } from "./crm-api-errors";
export { applyCorrelationId, getCorrelationIdFromHeaders } from "./correlation";
export { normalizeProblemDetails } from "./problem-details";
export { listQueryToSearchParams, normalizeListQuery } from "./query-model";
export { sanitizeFieldErrors, sanitizeText } from "./redaction";
export type {
  AddressDto,
  AddressUpsertRequest,
  CompanyDetailDto,
  CompanyListItemDto,
  CompanyUpsertRequest,
  ContactDetailDto,
  ContactListItemDto,
  ContactUpsertRequest,
  CrmApiAuthContext,
  CrmApiRequestOptions,
  CrmListQuery,
  CrmPagedResult,
  CrmNormalizedListQuery,
  CustomerDetailDto,
  CustomerListItemDto,
  CustomerUpsertRequest,
  HttpMethod,
  LeadDetailDto,
  LeadListItemDto,
  LeadUpdateRequest,
  LeadUpsertRequest,
  LeadOwnershipHistoryDto,
  LeadScoreDto,
  OpportunityDetailDto,
  OpportunityListItemDto,
  OpportunityUpdateRequest,
  OpportunityUpsertRequest,
  PipelineBoardColumnDto,
  PipelineBoardDto,
  PipelineBoardOpportunityDto,
  PipelineDto,
  PipelineStageDto,
  PipelineSummaryDto,
  ProblemDetails,
  SortDirection,
} from "./crm-api-types";
