namespace NetMetric.CRM.OpportunityManagement.Contracts.Requests;

public sealed class BulkAssignOpportunityOwnerRequest { public List<Guid> OpportunityIds { get; set; } = []; public Guid? OwnerUserId { get; set; } }