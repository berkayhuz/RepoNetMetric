namespace NetMetric.Tools.Contracts.Catalog;

public sealed record ToolCatalogResponse(
    IReadOnlyCollection<ToolCategoryResponse> Categories,
    IReadOnlyCollection<ToolCatalogItemResponse> Tools);
