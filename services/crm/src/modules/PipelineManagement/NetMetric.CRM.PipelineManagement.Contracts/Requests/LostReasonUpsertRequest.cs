namespace NetMetric.CRM.PipelineManagement.Contracts.Requests;

public sealed record LostReasonUpsertRequest(string Name, string? Description, bool IsDefault, string? RowVersion);