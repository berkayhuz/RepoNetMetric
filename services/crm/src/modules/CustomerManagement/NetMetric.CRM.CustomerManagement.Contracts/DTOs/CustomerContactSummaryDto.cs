namespace NetMetric.CRM.CustomerManagement.Contracts.DTOs;

public sealed record CustomerContactSummaryDto(
    Guid Id,
    string FullName,
    string? Email,
    string? MobilePhone,
    bool IsPrimaryContact,
    bool IsActive);
