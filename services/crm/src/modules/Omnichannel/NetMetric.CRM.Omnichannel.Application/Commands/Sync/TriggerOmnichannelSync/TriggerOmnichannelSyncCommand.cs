using NetMetric.CRM.Omnichannel.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.Omnichannel.Application.Commands.Sync.TriggerOmnichannelSync;

public sealed record TriggerOmnichannelSyncCommand(Guid AccountId) : IRequest<ChannelAccountDto>;
