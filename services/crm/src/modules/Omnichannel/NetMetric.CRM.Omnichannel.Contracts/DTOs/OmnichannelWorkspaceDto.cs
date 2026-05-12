namespace NetMetric.CRM.Omnichannel.Contracts.DTOs;

public sealed record OmnichannelWorkspaceDto(IReadOnlyList<ChannelAccountDto> Accounts, IReadOnlyList<ChannelConversationDto> Conversations, int OpenConversationCount);
