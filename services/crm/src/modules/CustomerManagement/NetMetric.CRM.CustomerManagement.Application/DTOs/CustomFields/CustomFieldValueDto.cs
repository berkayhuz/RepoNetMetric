namespace NetMetric.CRM.CustomerManagement.Application.DTOs.CustomFields;

public sealed class CustomFieldValueDto
{
    public required Guid DefinitionId { get; init; }
    public required string Name { get; init; }
    public required string Label { get; init; }
    public string? Value { get; init; }
    public required string DataType { get; init; }
}
