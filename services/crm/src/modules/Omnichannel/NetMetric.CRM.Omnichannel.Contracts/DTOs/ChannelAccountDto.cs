namespace NetMetric.CRM.Omnichannel.Contracts.DTOs;

public sealed record ChannelAccountDto(Guid Id, string Name, string ChannelType, string ExternalAccountId, string RoutingKey, bool IsActive);
