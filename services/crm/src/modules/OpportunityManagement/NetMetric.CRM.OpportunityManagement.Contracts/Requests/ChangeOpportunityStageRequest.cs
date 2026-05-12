using NetMetric.CRM.Types;

namespace NetMetric.CRM.OpportunityManagement.Contracts.Requests;

public sealed class ChangeOpportunityStageRequest
{
    public OpportunityStageType NewStage { get; set; }
    public string? Note { get; set; }
    public string? RowVersion { get; set; }
}
