namespace NetMetric.Tools.Contracts.Catalog;

public sealed record ToolCategoryResponse(
    string Slug,
    string Title,
    string Description,
    int SortOrder);
