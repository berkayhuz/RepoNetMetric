namespace NetMetric.CRM.CustomerManagement.Application.DTOs.Imports;

public sealed record ImportExecutionResultDto(
    string EntityName,
    bool DryRun,
    int TotalRows,
    int CreatedCount,
    int UpdatedCount,
    int SkippedCount,
    int ErrorCount,
    IReadOnlyList<ImportFailureDto> Errors);
