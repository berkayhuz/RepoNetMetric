namespace NetMetric.CRM.DealManagement.Contracts.Requests;

public sealed record BulkAssignDealsOwnerRequest(IReadOnlyList<Guid> DealIds, Guid? OwnerUserId);
