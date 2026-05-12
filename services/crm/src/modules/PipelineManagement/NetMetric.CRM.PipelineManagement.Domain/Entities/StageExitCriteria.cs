using NetMetric.Entities;

namespace NetMetric.CRM.PipelineManagement.Domain.Entities;

public class StageExitCriteria : AuditableEntity
{
    public Guid PipelineStageId { get; set; }
    public PipelineStage? PipelineStage { get; set; }

    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool IsMandatory { get; set; } = true;
}
