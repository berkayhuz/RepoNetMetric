using NetMetric.CRM.Types;

namespace NetMetric.CRM.TicketManagement.Contracts.DTOs;

public sealed record TicketDetailDto(
    Guid Id,
    string TicketNumber,
    string Subject,
    string? Description,
    TicketStatusType Status,
    PriorityType Priority,
    TicketType TicketType,
    TicketChannelType Channel,
    Guid? AssignedUserId,
    Guid? CustomerId,
    Guid? ContactId,
    Guid? TicketCategoryId,
    Guid? SlaPolicyId,
    DateTime OpenedAt,
    DateTime? ClosedAt,
    DateTime? FirstResponseDueAt,
    DateTime? ResolveDueAt,
    string? Notes,
    bool IsActive,
    byte[] RowVersion,
    IReadOnlyList<TicketCommentDto> Comments);
