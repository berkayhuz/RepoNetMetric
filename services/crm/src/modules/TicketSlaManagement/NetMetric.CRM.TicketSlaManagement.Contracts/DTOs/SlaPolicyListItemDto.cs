namespace NetMetric.CRM.TicketSlaManagement.Contracts.DTOs;

public sealed class SlaPolicyListItemDto
{
    public Guid Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public Guid? TicketCategoryId { get; init; }
    public int Priority { get; init; }
    public int FirstResponseTargetMinutes { get; init; }
    public int ResolutionTargetMinutes { get; init; }
    public bool IsDefault { get; init; }
}
