namespace NetMetric.CRM.OpportunityManagement.Contracts.Requests;

public sealed class MarkOpportunityLostRequest { public Guid? LostReasonId { get; set; } public string? LostNote { get; set; } public string? RowVersion { get; set; } }
