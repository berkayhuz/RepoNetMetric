using MediatR;
using NetMetric.CRM.Omnichannel.Contracts.DTOs;

namespace NetMetric.CRM.Omnichannel.Application.Commands.Sync.TriggerOmnichannelSync;

public sealed record TriggerOmnichannelSyncCommand(Guid AccountId) : IRequest<ChannelAccountDto>;
