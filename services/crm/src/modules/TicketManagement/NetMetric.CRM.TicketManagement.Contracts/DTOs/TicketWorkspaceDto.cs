namespace NetMetric.CRM.TicketManagement.Contracts.DTOs;

public sealed record TicketWorkspaceDto(
    TicketDetailDto Ticket,
    IReadOnlyList<TicketTimelineEventDto> Timeline,
    IReadOnlyList<TicketCategoryDto> AvailableCategories);
