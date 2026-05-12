namespace NetMetric.CRM.TicketManagement.Contracts.DTOs;

public sealed record TicketCommentDto(
    Guid Id,
    string Comment,
    bool IsInternal,
    DateTime CreatedAt,
    string? CreatedBy);
