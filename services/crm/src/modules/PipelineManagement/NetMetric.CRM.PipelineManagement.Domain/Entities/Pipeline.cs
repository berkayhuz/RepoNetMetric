using NetMetric.Entities;

namespace NetMetric.CRM.PipelineManagement.Domain.Entities;

public class Pipeline : AuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool IsDefault { get; set; }
    public int DisplayOrder { get; set; }

    public ICollection<PipelineStage> Stages { get; set; } = [];
}
