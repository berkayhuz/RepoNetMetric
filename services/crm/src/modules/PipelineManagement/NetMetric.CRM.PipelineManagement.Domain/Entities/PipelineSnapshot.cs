using NetMetric.Entities;

namespace NetMetric.CRM.PipelineManagement.Domain.Entities;

public class PipelineSnapshot : AuditableEntity
{
    public DateTime SnapshotDate { get; set; }
    public Guid PipelineId { get; set; }

    public decimal TotalValue { get; set; }
    public decimal WeightedValue { get; set; }
    public int OpportunityCount { get; set; }

    public string DataJson { get; set; } = string.Empty; // Aggregated data per stage
}
