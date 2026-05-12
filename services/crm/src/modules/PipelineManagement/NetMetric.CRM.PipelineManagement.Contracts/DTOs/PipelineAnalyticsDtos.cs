namespace NetMetric.CRM.PipelineManagement.Contracts.DTOs;

public record PipelineAnalyticsDto(
    Guid PipelineId,
    decimal HealthScore,
    decimal VelocityDays,
    decimal CoverageRatio,
    int TotalOpportunities,
    decimal TotalValue,
    List<StageAgingDto> StageAging);

public record StageAgingDto(
    Guid StageId,
    string StageName,
    int OpportunityCount,
    double AverageDaysInStage,
    int StaleCount);

public record PipelineSnapshotDto(
    DateTime SnapshotDate,
    int OpportunityCount,
    decimal TotalValue,
    int WonCount,
    int LostCount);
