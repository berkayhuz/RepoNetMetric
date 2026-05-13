namespace NetMetric.Tools.Contracts.Catalog;

public sealed record ToolCatalogItemResponse(
    string Slug,
    string Title,
    string Description,
    string CategorySlug,
    string ExecutionMode,
    string AvailabilityStatus,
    bool IsEnabled,
    IReadOnlyCollection<string> AcceptedMimeTypes,
    long GuestMaxFileBytes,
    long AuthenticatedMaxSaveBytes,
    string SeoTitle,
    string SeoDescription);
