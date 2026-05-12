using NetMetric.CRM.Types;

namespace NetMetric.CRM.OpportunityManagement.Contracts.Requests;

public sealed class BulkChangeOpportunityStageRequest { public List<Guid> OpportunityIds { get; set; } = []; public OpportunityStageType NewStage { get; set; } public string? Note { get; set; } }
