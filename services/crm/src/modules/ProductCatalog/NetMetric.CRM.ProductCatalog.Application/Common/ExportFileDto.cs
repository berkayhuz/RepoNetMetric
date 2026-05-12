namespace NetMetric.CRM.ProductCatalog.Application.Common;

public sealed class ExportFileDto
{
    public required string FileName { get; init; }
    public required string ContentType { get; init; }
    public required byte[] Content { get; init; }
}
