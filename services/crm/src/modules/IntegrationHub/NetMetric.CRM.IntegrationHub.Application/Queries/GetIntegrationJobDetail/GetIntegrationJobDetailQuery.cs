using MediatR;
using NetMetric.CRM.IntegrationHub.Application.DTOs;

namespace NetMetric.CRM.IntegrationHub.Application.Queries.GetIntegrationJobDetail;

public sealed record GetIntegrationJobDetailQuery(Guid TenantId, Guid JobId) : IRequest<IntegrationJobDetailDto>;
