using MediatR;
using NetMetric.CRM.IntegrationHub.Application.DTOs;
using NetMetric.Pagination;

namespace NetMetric.CRM.IntegrationHub.Application.Queries.ListIntegrationJobs;

public sealed record ListIntegrationJobsQuery(
    Guid TenantId,
    string? Status,
    string? ProviderKey,
    int Page,
    int PageSize) : IRequest<PagedResult<IntegrationJobListItemDto>>;
