namespace NetMetric.CRM.FinanceOperations.Contracts.DTOs;

public sealed class FinanceOperationsSummaryDto
{
    public required Guid Id { get; init; }
    public required string Code { get; init; }
    public required string Name { get; init; }
    public string? Description { get; init; }
    public required bool IsActive { get; init; }
}
