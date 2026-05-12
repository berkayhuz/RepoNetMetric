namespace NetMetric.CRM.SalesForecasting.Contracts.DTOs;

public sealed record SalesForecastSummaryDto(
    DateOnly PeriodStart,
    DateOnly PeriodEnd,
    decimal PipelineAmount,
    decimal WeightedPipelineAmount,
    decimal BestCaseAmount,
    decimal CommitAmount,
    decimal ClosedWonAmount,
    decimal QuotaAmount,
    decimal AdjustmentAmount,
    decimal CoverageRatio,
    decimal AttainmentRatio,
    IReadOnlyList<SalesForecastOwnerSummaryDto> Owners);