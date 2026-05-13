namespace NetMetric.CRM.OpportunityManagement.Contracts.Requests;

public sealed class OpportunityContactLinkRequest { public Guid ContactId { get; set; } public bool IsDecisionMaker { get; set; } public bool IsPrimary { get; set; } }
