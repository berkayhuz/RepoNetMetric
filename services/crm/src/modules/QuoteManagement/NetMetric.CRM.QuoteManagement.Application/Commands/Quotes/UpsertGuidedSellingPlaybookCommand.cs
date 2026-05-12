using NetMetric.CRM.QuoteManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.QuoteManagement.Application.Commands.Quotes;

public sealed record UpsertGuidedSellingPlaybookCommand(
    Guid? GuidedSellingPlaybookId,
    string Name,
    string? Segment,
    string? Industry,
    decimal? MinimumBudget,
    decimal? MaximumBudget,
    string? RequiredCapabilities,
    IReadOnlyList<string> RecommendedBundleCodes,
    string? QualificationJson,
    string? RowVersion) : IRequest<GuidedSellingPlaybookDto>;
