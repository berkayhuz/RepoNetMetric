using NetMetric.CRM.QuoteManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.QuoteManagement.Application.Queries.Quotes;

public sealed record RunGuidedSellingQuery(
    string? Segment,
    string? Industry,
    decimal? Budget,
    IReadOnlyList<string> RequiredCapabilities) : IRequest<IReadOnlyList<GuidedSellingRecommendationDto>>;
