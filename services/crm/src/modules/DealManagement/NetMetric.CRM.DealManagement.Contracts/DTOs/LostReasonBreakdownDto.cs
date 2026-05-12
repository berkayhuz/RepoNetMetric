namespace NetMetric.CRM.DealManagement.Contracts.DTOs;

public sealed record LostReasonBreakdownDto(Guid? LostReasonId, string Label, int Count, decimal TotalAmount);