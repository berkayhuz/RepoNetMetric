using NetMetric.CRM.Types;

namespace NetMetric.CRM.CustomerManagement.Contracts.DTOs;

public sealed record CompanyDetailDto(
    Guid Id,
    string Name,
    string? TaxNumber,
    string? TaxOffice,
    string? Website,
    string? Email,
    string? Phone,
    string? Sector,
    string? EmployeeCountRange,
    decimal? AnnualRevenue,
    string? Description,
    string? Notes,
    CompanyType CompanyType,
    Guid? OwnerUserId,
    Guid? ParentCompanyId,
    bool IsActive,
    IReadOnlyList<AddressDto> Addresses,
    string RowVersion);
