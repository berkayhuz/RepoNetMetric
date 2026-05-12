namespace NetMetric.CRM.TicketManagement.Contracts.DTOs;

public sealed record TicketCategoryDto(
    Guid Id,
    string Name,
    string? Description,
    Guid? ParentCategoryId,
    bool IsActive);
