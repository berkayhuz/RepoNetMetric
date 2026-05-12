using NetMetric.Entities;

namespace NetMetric.CRM.PipelineManagement.Domain.Entities;

public class StageRequiredField : AuditableEntity
{
    public Guid PipelineStageId { get; set; }
    public PipelineStage? PipelineStage { get; set; }

    public string FieldName { get; set; } = string.Empty;
    public string? DisplayName { get; set; }
    public string? ValidationRule { get; set; } // Regex or custom rule
    public string? ErrorMessage { get; set; }
}
