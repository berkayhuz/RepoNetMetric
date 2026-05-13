namespace NetMetric.CRM.DealManagement.Contracts.DTOs;

public sealed record DealOutcomeHistoryDto(Guid Id, string Outcome, string Stage, DateTime OccurredAt, Guid? ChangedByUserId, Guid? LostReasonId, string? Note);
