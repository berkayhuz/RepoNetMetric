namespace NetMetric.CRM.CustomerManagement.Contracts.DTOs;

public sealed record ContactListItemDto(
    Guid Id,
    string FullName,
    string? Email,
    string? MobilePhone,
    string? CompanyName,
    string? CustomerName,
    bool IsPrimaryContact,
    bool IsActive,
    string RowVersion);
