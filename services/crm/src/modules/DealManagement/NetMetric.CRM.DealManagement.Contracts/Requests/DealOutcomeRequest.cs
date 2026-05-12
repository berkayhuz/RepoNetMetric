namespace NetMetric.CRM.DealManagement.Contracts.Requests;

public sealed record DealOutcomeRequest(DateTime? OccurredAt, Guid? LostReasonId, string? Note, string? RowVersion);