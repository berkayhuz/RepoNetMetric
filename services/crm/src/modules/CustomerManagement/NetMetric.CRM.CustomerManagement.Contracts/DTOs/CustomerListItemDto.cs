using NetMetric.CRM.Types;

namespace NetMetric.CRM.CustomerManagement.Contracts.DTOs;

public sealed record CustomerListItemDto(
    Guid Id,
    string FullName,
    string? Email,
    string? MobilePhone,
    CustomerType CustomerType,
    bool IsVip,
    string? CompanyName,
    bool IsActive,
    string RowVersion);
