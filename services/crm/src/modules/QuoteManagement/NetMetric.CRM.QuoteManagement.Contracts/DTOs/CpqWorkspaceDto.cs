namespace NetMetric.CRM.QuoteManagement.Contracts.DTOs;

public sealed record CpqWorkspaceDto(
    IReadOnlyList<ProductRuleDto> ProductRules,
    IReadOnlyList<ProductBundleDto> ProductBundles,
    IReadOnlyList<GuidedSellingPlaybookDto> GuidedSellingPlaybooks);
