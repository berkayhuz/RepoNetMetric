namespace NetMetric.CRM.SalesForecasting.Contracts.DTOs;

public sealed record ForecastSnapshotDto(
    Guid Id,
    string Name,
    DateOnly PeriodStart,
    DateOnly PeriodEnd,
    Guid? OwnerUserId,
    string ForecastCategory,
    decimal PipelineAmount,
    decimal WeightedPipelineAmount,
    decimal BestCaseAmount,
    decimal CommitAmount,
    decimal ClosedWonAmount,
    decimal QuotaAmount,
    decimal AdjustmentAmount,
    string? Notes,
    string RowVersion);
