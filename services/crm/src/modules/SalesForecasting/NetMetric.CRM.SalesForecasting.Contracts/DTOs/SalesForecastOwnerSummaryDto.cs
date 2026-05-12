namespace NetMetric.CRM.SalesForecasting.Contracts.DTOs;

public sealed record SalesForecastOwnerSummaryDto(
    Guid? OwnerUserId,
    decimal PipelineAmount,
    decimal WeightedPipelineAmount,
    decimal BestCaseAmount,
    decimal CommitAmount,
    decimal ClosedWonAmount,
    decimal QuotaAmount,
    decimal CoverageRatio,
    decimal AttainmentRatio);