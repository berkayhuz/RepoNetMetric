using NetMetric.CRM.SupportInboxIntegration.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.SupportInboxIntegration.Application.Commands.Connections.UpdateSupportInboxConnection;

public sealed record UpdateSupportInboxConnectionCommand(Guid ConnectionId, string Name, string Host, int Port, string Username, string SecretReference, bool UseSsl, bool IsActive) : IRequest<SupportInboxConnectionDto>;
