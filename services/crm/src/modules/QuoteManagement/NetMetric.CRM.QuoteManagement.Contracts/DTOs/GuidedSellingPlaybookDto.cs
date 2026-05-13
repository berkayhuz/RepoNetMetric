namespace NetMetric.CRM.QuoteManagement.Contracts.DTOs;

public sealed record GuidedSellingPlaybookDto(
    Guid Id,
    string Name,
    string? Segment,
    string? Industry,
    decimal? MinimumBudget,
    decimal? MaximumBudget,
    string? RequiredCapabilities,
    IReadOnlyList<string> RecommendedBundleCodes,
    string? QualificationJson,
    bool IsActive,
    string RowVersion);
