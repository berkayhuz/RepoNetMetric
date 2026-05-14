import "server-only";

export type SortDirection = "asc" | "desc";
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type CustomerType = string | number;
export type CompanyType = string | number;
export type GenderType = string | number;

export type ProblemDetails = {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  traceId?: string;
  correlationId?: string;
  errorCode?: string;
  errors?: Record<string, string[]>;
};

export type CrmApiAuthContext = {
  bearerToken?: string;
};

export type CrmApiRequestOptions = {
  authContext?: CrmApiAuthContext;
  correlationId?: string;
  timeoutMs?: number;
  signal?: AbortSignal;
};

export type CrmListQuery = {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortDirection?: SortDirection;
  filters?: Record<string, string | number | boolean | undefined | null>;
};

export type CrmNormalizedListQuery = {
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
  sortDirection?: SortDirection;
  filters: Record<string, string | number | boolean>;
};

export type CrmPagedResult<TItem> = {
  items: TItem[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};

export type AddressDto = {
  id: string;
  addressType: string | number;
  line1: string;
  line2?: string | null;
  district?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  zipCode?: string | null;
  isDefault: boolean;
  rowVersion: string;
};

export type CustomerContactSummaryDto = {
  id: string;
  fullName: string;
  email?: string | null;
  mobilePhone?: string | null;
  isPrimaryContact: boolean;
};

export type CustomerListItemDto = {
  id: string;
  fullName: string;
  email?: string | null;
  mobilePhone?: string | null;
  customerType: CustomerType;
  isVip: boolean;
  companyName?: string | null;
  isActive: boolean;
  rowVersion: string;
};

export type CustomerDetailDto = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  title?: string | null;
  email?: string | null;
  mobilePhone?: string | null;
  workPhone?: string | null;
  personalPhone?: string | null;
  birthDate?: string | null;
  gender: GenderType;
  department?: string | null;
  jobTitle?: string | null;
  description?: string | null;
  notes?: string | null;
  ownerUserId?: string | null;
  customerType: CustomerType;
  identityNumber?: string | null;
  isVip: boolean;
  companyId?: string | null;
  companyName?: string | null;
  isActive: boolean;
  addresses: AddressDto[];
  contacts: CustomerContactSummaryDto[];
  rowVersion: string;
};

export type CompanyListItemDto = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  companyType: CompanyType;
  sector?: string | null;
  isActive: boolean;
  contactCount: number;
  rowVersion: string;
};

export type CompanyDetailDto = {
  id: string;
  name: string;
  taxNumber?: string | null;
  taxOffice?: string | null;
  website?: string | null;
  email?: string | null;
  phone?: string | null;
  sector?: string | null;
  employeeCountRange?: string | null;
  annualRevenue?: number | null;
  description?: string | null;
  notes?: string | null;
  companyType: CompanyType;
  ownerUserId?: string | null;
  parentCompanyId?: string | null;
  isActive: boolean;
  addresses: AddressDto[];
  rowVersion: string;
};

export type ContactListItemDto = {
  id: string;
  fullName: string;
  email?: string | null;
  mobilePhone?: string | null;
  companyName?: string | null;
  customerName?: string | null;
  isPrimaryContact: boolean;
  isActive: boolean;
  rowVersion: string;
};

export type ContactDetailDto = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  title?: string | null;
  email?: string | null;
  mobilePhone?: string | null;
  workPhone?: string | null;
  personalPhone?: string | null;
  birthDate?: string | null;
  gender: GenderType;
  department?: string | null;
  jobTitle?: string | null;
  description?: string | null;
  notes?: string | null;
  ownerUserId?: string | null;
  companyId?: string | null;
  companyName?: string | null;
  customerId?: string | null;
  customerName?: string | null;
  isPrimaryContact: boolean;
  isActive: boolean;
  rowVersion: string;
};

export type LeadListItemDto = {
  id: string;
  leadCode: string;
  fullName: string;
  companyName?: string | null;
  email?: string | null;
  phone?: string | null;
  status: string | number;
  source: string | number;
  priority: string | number;
  ownerUserId?: string | null;
  estimatedBudget?: number | null;
  nextContactDate?: string | null;
  totalScore: number;
  grade: string | number;
  qualificationFramework: string | number;
  slaTargetTime?: string | null;
  slaBreached: boolean;
  isActive: boolean;
  rowVersion: string;
};

export type LeadScoreDto = {
  id: string;
  score: number;
  scoreReason?: string | null;
  scoredByUserId?: string | null;
  scoredAt: string;
};

export type LeadOwnershipHistoryDto = {
  id: string;
  previousOwnerId?: string | null;
  newOwnerId?: string | null;
  assignmentReason?: string | null;
  assignmentRuleId?: string | null;
  assignedAt: string;
  assignedByUserId?: string | null;
};

export type LeadDetailDto = {
  id: string;
  leadCode: string;
  fullName: string;
  companyName?: string | null;
  email?: string | null;
  phone?: string | null;
  jobTitle?: string | null;
  description?: string | null;
  estimatedBudget?: number | null;
  nextContactDate?: string | null;
  source: string | number;
  status: string | number;
  priority: string | number;
  companyId?: string | null;
  ownerUserId?: string | null;
  convertedCustomerId?: string | null;
  notes?: string | null;
  totalScore: number;
  fitScore: number;
  grade: string | number;
  qualificationFramework: string | number;
  qualificationData?: string | null;
  slaTargetTime?: string | null;
  firstContactTime?: string | null;
  slaBreached: boolean;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  referrerUrl?: string | null;
  isActive: boolean;
  scores: LeadScoreDto[];
  ownershipHistories: LeadOwnershipHistoryDto[];
  rowVersion: string;
};

export type LeadUpsertRequest = {
  fullName: string;
  companyName?: string | null;
  email?: string | null;
  phone?: string | null;
  jobTitle?: string | null;
  description?: string | null;
  estimatedBudget?: number | null;
  nextContactDate?: string | null;
  source: number;
  status: number;
  priority: number;
  companyId?: string | null;
  ownerUserId?: string | null;
  notes?: string | null;
};

export type LeadUpdateRequest = LeadUpsertRequest & {
  rowVersion?: string | null;
};

export type OpportunityListItemDto = {
  id: string;
  opportunityCode: string;
  name: string;
  estimatedAmount?: number | null;
  expectedRevenue?: number | null;
  probability: number;
  stage: string | number;
  status: string | number;
  priority: string | number;
  estimatedCloseDate?: string | null;
  leadId?: string | null;
  customerId?: string | null;
  ownerUserId?: string | null;
  isActive: boolean;
};

export type OpportunityDetailDto = {
  id: string;
  opportunityCode: string;
  name: string;
  description?: string | null;
  estimatedAmount?: number | null;
  expectedRevenue?: number | null;
  probability: number;
  estimatedCloseDate?: string | null;
  stage: string | number;
  pipelineId?: string | null;
  pipelineStageId?: string | null;
  status: string | number;
  priority: string | number;
  leadId?: string | null;
  customerId?: string | null;
  ownerUserId?: string | null;
  lostReasonId?: string | null;
  lostNote?: string | null;
  notes?: string | null;
  isActive: boolean;
  rowVersion: string;
};

export type OpportunityUpsertRequest = {
  opportunityCode: string;
  name: string;
  description?: string | null;
  estimatedAmount: number;
  expectedRevenue?: number | null;
  probability: number;
  estimatedCloseDate?: string | null;
  stage: number;
  status: number;
  priority: number;
  leadId?: string | null;
  customerId?: string | null;
  ownerUserId?: string | null;
  notes?: string | null;
};

export type OpportunityUpdateRequest = OpportunityUpsertRequest & {
  rowVersion: string;
};

export type PipelineSummaryDto = {
  id: string;
  name: string;
  stageCount: number;
  isDefault: boolean;
};

export type PipelineStageDto = {
  id: string;
  pipelineId: string;
  name: string;
  description?: string | null;
  displayOrder: number;
  probability: number;
  isWinStage: boolean;
  isLostStage: boolean;
  forecastCategory: string | number;
  rowVersion: string;
};

export type PipelineDto = {
  id: string;
  name: string;
  description?: string | null;
  isDefault: boolean;
  displayOrder: number;
  stages: PipelineStageDto[];
  rowVersion: string;
};

export type PipelineBoardOpportunityDto = {
  id: string;
  name: string;
  opportunityCode: string;
  amount: number;
  customerName?: string | null;
  estimatedCloseDate?: string | null;
  isStale: boolean;
  warningCount: number;
};

export type PipelineBoardColumnDto = {
  stageId: string;
  name: string;
  probability: number;
  opportunityCount: number;
  totalValue: number;
  opportunities: PipelineBoardOpportunityDto[];
};

export type PipelineBoardDto = {
  pipelineId: string;
  pipelineName: string;
  columns: PipelineBoardColumnDto[];
};

export type PipelineStageMoveRequest = {
  newStage: number;
  newPipelineStageId?: string | null;
  note?: string | null;
  lostReasonId?: string | null;
  lostNote?: string | null;
  rowVersion?: string | null;
};

export type PipelineStageMoveResultDto = {
  opportunityId: string;
  previousStage: string | number;
  currentStage: string | number;
  status: string | number;
  lostReasonId?: string | null;
  lostNote?: string | null;
  rowVersion?: string | null;
};

export type DealListItemDto = {
  id: string;
  dealCode: string;
  name: string;
  totalAmount?: number | null;
  closedDate: string;
  opportunityId?: string | null;
  companyId?: string | null;
  ownerUserId?: string | null;
  stage: string | number;
  outcome: string | number;
  isActive: boolean;
};

export type DealOutcomeHistoryDto = {
  id: string;
  outcome: string;
  stage: string;
  occurredAt: string;
  changedByUserId?: string | null;
  lostReasonId?: string | null;
  note?: string | null;
};

export type DealDetailDto = {
  id: string;
  dealCode: string;
  name: string;
  totalAmount?: number | null;
  closedDate: string;
  opportunityId?: string | null;
  companyId?: string | null;
  ownerUserId?: string | null;
  stage: string | number;
  outcome: string | number;
  lostReasonId?: string | null;
  lostNote?: string | null;
  isActive: boolean;
  review?: unknown | null;
  history: DealOutcomeHistoryDto[];
  rowVersion: string;
};

export type DealUpsertRequest = {
  dealCode: string;
  name: string;
  totalAmount: number;
  closedDate: string;
  opportunityId?: string | null;
  companyId?: string | null;
  ownerUserId?: string | null;
  notes?: string | null;
  rowVersion?: string | null;
};

export type AssignDealOwnerRequest = {
  ownerUserId?: string | null;
};

export type DealOutcomeRequest = {
  occurredAt?: string | null;
  lostReasonId?: string | null;
  note?: string | null;
  rowVersion?: string | null;
};

export type DealLostReasonDto = {
  id: string;
  name: string;
  description?: string | null;
  isDefault: boolean;
};

export type QuoteListItemDto = {
  id: string;
  quoteNumber: string;
  proposalTitle?: string | null;
  status: string | number;
  quoteDate: string;
  validUntil?: string | null;
  grandTotal?: number | null;
  currencyCode: string;
  opportunityId?: string | null;
  customerId?: string | null;
  ownerUserId?: string | null;
  revisionNumber: number;
  isActive: boolean;
};

export type QuoteItemDto = {
  id: string;
  productId: string;
  description?: string | null;
  quantity: number;
  unitPrice: number;
  discountRate: number;
  taxRate: number;
  lineTotal: number;
};

export type QuoteStatusHistoryDto = {
  id: string;
  oldStatus?: string | number | null;
  newStatus: string | number;
  changedAt: string;
  changedByUserId?: string | null;
  note?: string | null;
};

export type QuoteDetailDto = {
  id: string;
  quoteNumber: string;
  proposalTitle?: string | null;
  proposalSummary?: string | null;
  proposalBody?: string | null;
  status: string | number;
  quoteDate: string;
  validUntil?: string | null;
  subTotal?: number | null;
  discountTotal?: number | null;
  taxTotal?: number | null;
  grandTotal?: number | null;
  termsAndConditions?: string | null;
  opportunityId?: string | null;
  customerId?: string | null;
  ownerUserId?: string | null;
  currencyCode: string;
  exchangeRate?: number | null;
  revisionNumber: number;
  parentQuoteId?: string | null;
  proposalTemplateId?: string | null;
  submittedAt?: string | null;
  approvedAt?: string | null;
  sentAt?: string | null;
  acceptedAt?: string | null;
  declinedAt?: string | null;
  expiredAt?: string | null;
  rejectionReason?: string | null;
  declineReason?: string | null;
  items: QuoteItemDto[];
  history: QuoteStatusHistoryDto[];
  rowVersion: string;
};

export type WorkTaskDto = {
  id: string;
  title: string;
  description: string;
  ownerUserId?: string | null;
  dueAtUtc: string;
  priority: number;
  status: string;
};

export type MeetingScheduleDto = {
  id: string;
  title: string;
  startsAtUtc: string;
  endsAtUtc: string;
  organizerEmail?: string | null;
  requiresExternalSync: boolean;
};

export type WorkManagementWorkspaceDto = {
  tasks: WorkTaskDto[];
  meetings: MeetingScheduleDto[];
  openTaskCount: number;
  upcomingMeetingCount: number;
};

export type CreateWorkTaskRequest = {
  title: string;
  description: string;
  ownerUserId?: string | null;
  dueAtUtc: string;
  priority: number;
};

export type ScheduleMeetingRequest = {
  title: string;
  startsAtUtc: string;
  endsAtUtc: string;
  organizerEmail: string;
  attendeeSummary: string;
  requiresExternalSync: boolean;
};

export type CustomerUpsertRequest = {
  firstName: string;
  lastName: string;
  title?: string | null;
  email?: string | null;
  mobilePhone?: string | null;
  workPhone?: string | null;
  personalPhone?: string | null;
  birthDate?: string | null;
  gender: GenderType;
  department?: string | null;
  jobTitle?: string | null;
  description?: string | null;
  notes?: string | null;
  ownerUserId?: string | null;
  customerType: CustomerType;
  identityNumber?: string | null;
  isVip: boolean;
  companyId?: string | null;
  rowVersion?: string | null;
};

export type CompanyUpsertRequest = {
  name: string;
  taxNumber?: string | null;
  taxOffice?: string | null;
  website?: string | null;
  email?: string | null;
  phone?: string | null;
  sector?: string | null;
  employeeCountRange?: string | null;
  annualRevenue?: number | null;
  description?: string | null;
  notes?: string | null;
  companyType: CompanyType;
  ownerUserId?: string | null;
  parentCompanyId?: string | null;
  rowVersion?: string | null;
};

export type ContactUpsertRequest = {
  firstName: string;
  lastName: string;
  title?: string | null;
  email?: string | null;
  mobilePhone?: string | null;
  workPhone?: string | null;
  personalPhone?: string | null;
  birthDate?: string | null;
  gender: GenderType;
  department?: string | null;
  jobTitle?: string | null;
  description?: string | null;
  notes?: string | null;
  ownerUserId?: string | null;
  companyId?: string | null;
  customerId?: string | null;
  isPrimaryContact: boolean;
  rowVersion?: string | null;
};

export type AddressUpsertRequest = {
  addressType: string | number;
  line1: string;
  line2?: string | null;
  district?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  zipCode?: string | null;
  isDefault: boolean;
  rowVersion?: string | null;
};
