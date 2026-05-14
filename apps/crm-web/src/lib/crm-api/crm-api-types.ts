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
