namespace NetMetric.CRM.TagManagement.Contracts.DTOs;

public sealed class TagSummaryDto
{
    public required Guid TagId { get; init; }
    public required string Name { get; init; }
    public required string Color { get; init; }
    public required string? GroupName { get; init; }
}
