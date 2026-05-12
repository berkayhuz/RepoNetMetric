namespace NetMetric.CRM.Sales;

public class OpportunityStageHistory : AuditableEntity
{
    public Guid OpportunityId { get; set; }
    public Opportunity? Opportunity { get; set; }
    public OpportunityStageType OldStage { get; set; }
    public OpportunityStageType NewStage { get; set; }
    public string? Note { get; set; }
    public DateTime OccurredAt { get; set; }
    public DateTime ChangedAt { get; set; }
    public Guid? ChangedByUserId { get; set; }
}
