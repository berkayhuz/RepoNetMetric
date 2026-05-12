using NetMetric.CRM.Types;

namespace NetMetric.CRM.CustomerManagement.Contracts.DTOs;

public sealed record CompanyListItemDto(
    Guid Id,
    string Name,
    string? Email,
    string? Phone,
    CompanyType CompanyType,
    string? Sector,
    bool IsActive,
    int ContactCount,
    string RowVersion);
