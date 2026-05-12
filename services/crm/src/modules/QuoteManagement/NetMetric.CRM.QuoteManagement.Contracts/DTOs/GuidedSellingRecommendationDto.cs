namespace NetMetric.CRM.QuoteManagement.Contracts.DTOs;

public sealed record GuidedSellingRecommendationDto(
    string PlaybookName,
    Guid BundleId,
    string BundleCode,
    string BundleName,
    decimal EstimatedDiscountRate,
    decimal Score,
    IReadOnlyList<string> Reasons);
