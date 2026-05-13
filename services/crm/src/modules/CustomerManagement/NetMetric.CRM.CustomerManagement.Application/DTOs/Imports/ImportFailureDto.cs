namespace NetMetric.CRM.CustomerManagement.Application.DTOs.Imports;

public sealed record ImportFailureDto(
    int RowNumber,
    string Message);
