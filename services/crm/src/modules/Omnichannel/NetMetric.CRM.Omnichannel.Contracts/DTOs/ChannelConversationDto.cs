namespace NetMetric.CRM.Omnichannel.Contracts.DTOs;

public sealed record ChannelConversationDto(Guid Id, Guid AccountId, string Subject, string CustomerDisplayName, string Status, DateTime LastMessageAtUtc);
