using MediatR;
using NetMetric.CRM.IntegrationHub.Application.DTOs;

namespace NetMetric.CRM.IntegrationHub.Application.Queries.GetIntegrationWorkerStatus;

public sealed record GetIntegrationWorkerStatusQuery(Guid TenantId) : IRequest<IntegrationWorkerStatusDto>;
