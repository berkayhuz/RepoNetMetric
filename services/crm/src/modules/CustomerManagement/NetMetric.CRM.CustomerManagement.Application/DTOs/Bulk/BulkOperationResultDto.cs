namespace NetMetric.CRM.CustomerManagement.Application.DTOs.Bulk;

public sealed class BulkOperationResultDto
{
    public required int RequestedCount { get; init; }
    public required int AffectedCount { get; init; }
    public required IReadOnlyList<Guid> MissingIds { get; init; }
    public string? Message { get; init; }
}
