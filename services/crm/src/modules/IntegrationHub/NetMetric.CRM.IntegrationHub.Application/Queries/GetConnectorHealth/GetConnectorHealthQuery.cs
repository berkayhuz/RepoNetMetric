using MediatR;
using NetMetric.CRM.IntegrationHub.Application.DTOs;

namespace NetMetric.CRM.IntegrationHub.Application.Queries.GetConnectorHealth;

public sealed record GetConnectorHealthQuery(Guid TenantId) : IRequest<IReadOnlyCollection<IntegrationConnectorHealthDto>>;
