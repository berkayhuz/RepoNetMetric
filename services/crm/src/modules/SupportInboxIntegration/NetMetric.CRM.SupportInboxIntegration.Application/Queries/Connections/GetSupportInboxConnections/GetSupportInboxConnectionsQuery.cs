using MediatR;
using NetMetric.CRM.SupportInboxIntegration.Contracts.DTOs;

namespace NetMetric.CRM.SupportInboxIntegration.Application.Queries.Connections.GetSupportInboxConnections;

public sealed record GetSupportInboxConnectionsQuery() : IRequest<IReadOnlyList<SupportInboxConnectionDto>>;
