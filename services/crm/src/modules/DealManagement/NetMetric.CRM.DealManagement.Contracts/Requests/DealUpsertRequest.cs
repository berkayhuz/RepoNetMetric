namespace NetMetric.CRM.DealManagement.Contracts.Requests;

public sealed record DealUpsertRequest(string DealCode, string Name, decimal TotalAmount, DateTime ClosedDate, Guid? OpportunityId, Guid? CompanyId, Guid? OwnerUserId, string? Notes, string? RowVersion);