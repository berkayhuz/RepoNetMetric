using NetMetric.CRM.Types;

namespace NetMetric.CRM.TicketManagement.Contracts.DTOs;

public sealed record TicketListItemDto(
    Guid Id,
    string TicketNumber,
    string Subject,
    TicketStatusType Status,
    PriorityType Priority,
    TicketType TicketType,
    Guid? AssignedUserId,
    Guid? CustomerId,
    Guid? ContactId,
    DateTime OpenedAt,
    DateTime? ClosedAt,
    bool IsActive);
