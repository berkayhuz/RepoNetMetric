namespace NetMetric.CRM.OpportunityManagement.Contracts.Requests;

public sealed class MarkOpportunityWonRequest { public string? DealName { get; set; } public DateTime ClosedDate { get; set; } = DateTime.UtcNow; public string? RowVersion { get; set; } }
