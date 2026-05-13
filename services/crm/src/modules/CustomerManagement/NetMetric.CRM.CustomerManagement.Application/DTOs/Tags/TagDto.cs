namespace NetMetric.CRM.CustomerManagement.Application.DTOs.Tags;

public sealed class TagDto
{
    public required Guid Id { get; init; }
    public required string Name { get; init; }
    public string? ColorHex { get; init; }
    public string? Description { get; init; }
}
