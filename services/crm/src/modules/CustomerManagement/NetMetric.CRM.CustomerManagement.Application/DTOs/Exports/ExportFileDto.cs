namespace NetMetric.CRM.CustomerManagement.Application.DTOs.Exports;

public sealed class ExportFileDto
{
    public required string FileName { get; init; }
    public required string ContentType { get; init; }
    public required byte[] Content { get; init; }
}
