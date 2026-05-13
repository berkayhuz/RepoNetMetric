namespace NetMetric.CRM.SupportInboxIntegration.Contracts.DTOs;

public sealed record SupportInboxMessageDto(Guid Id, Guid ConnectionId, Guid? TicketId, string ExternalMessageId, string FromAddress, string Subject, DateTime ReceivedAtUtc, string Status, string? ProcessingError);
