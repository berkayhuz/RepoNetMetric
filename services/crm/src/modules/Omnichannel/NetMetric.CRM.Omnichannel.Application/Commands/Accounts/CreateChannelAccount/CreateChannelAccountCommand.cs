using NetMetric.CRM.Omnichannel.Contracts.DTOs;
using NetMetric.CRM.Omnichannel.Domain.Enums;
using MediatR;

namespace NetMetric.CRM.Omnichannel.Application.Commands.Accounts.CreateChannelAccount;

public sealed record CreateChannelAccountCommand(string Name, ChannelType ChannelType, string ExternalAccountId, string SecretReference, string RoutingKey) : IRequest<ChannelAccountDto>;
