namespace NetMetric.CRM.SalesForecasting.Contracts.DTOs;

public sealed record SalesForecastWorkspaceDto(
    SalesForecastSummaryDto Summary,
    IReadOnlyList<OpportunityForecastRowDto> Opportunities,
    IReadOnlyList<SalesQuotaDto> Quotas,
    IReadOnlyList<ForecastAdjustmentDto> Adjustments,
    IReadOnlyList<ForecastSnapshotDto> Snapshots);
