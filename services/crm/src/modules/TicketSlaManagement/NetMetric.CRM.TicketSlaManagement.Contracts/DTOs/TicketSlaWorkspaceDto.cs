namespace NetMetric.CRM.TicketSlaManagement.Contracts.DTOs;

public sealed class TicketSlaWorkspaceDto
{
    public Guid TicketId { get; init; }
    public Guid SlaPolicyId { get; init; }
    public DateTime FirstResponseDueAtUtc { get; init; }
    public DateTime ResolutionDueAtUtc { get; init; }
    public DateTime? FirstRespondedAtUtc { get; init; }
    public DateTime? ResolvedAtUtc { get; init; }
    public bool IsFirstResponseBreached { get; init; }
    public bool IsResolutionBreached { get; init; }
}
