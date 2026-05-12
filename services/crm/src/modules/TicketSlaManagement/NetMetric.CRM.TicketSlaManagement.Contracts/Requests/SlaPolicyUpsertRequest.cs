namespace NetMetric.CRM.TicketSlaManagement.Contracts.Requests;

public sealed class SlaPolicyUpsertRequest
{
    public string Name { get; init; } = string.Empty;
    public Guid? TicketCategoryId { get; init; }
    public int Priority { get; init; }
    public int FirstResponseTargetMinutes { get; init; }
    public int ResolutionTargetMinutes { get; init; }
    public bool IsDefault { get; init; }
}
