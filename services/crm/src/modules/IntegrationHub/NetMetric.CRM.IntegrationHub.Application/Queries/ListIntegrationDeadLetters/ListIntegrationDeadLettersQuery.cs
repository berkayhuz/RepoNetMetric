using MediatR;
using NetMetric.CRM.IntegrationHub.Application.DTOs;
using NetMetric.Pagination;

namespace NetMetric.CRM.IntegrationHub.Application.Queries.ListIntegrationDeadLetters;

public sealed record ListIntegrationDeadLettersQuery(
    Guid TenantId,
    string? ProviderKey,
    int Page,
    int PageSize) : IRequest<PagedResult<IntegrationDeadLetterDto>>;
