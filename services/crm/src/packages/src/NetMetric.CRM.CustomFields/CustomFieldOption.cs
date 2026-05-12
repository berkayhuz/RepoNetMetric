namespace NetMetric.CRM.CustomFields;

public class CustomFieldOption : AuditableEntity
{
    public Guid CustomFieldDefinitionId { get; set; }
    public CustomFieldDefinition? CustomFieldDefinition { get; set; }
    public string Label { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public int OrderNo { get; set; }
}
