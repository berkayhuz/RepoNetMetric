namespace NetMetric.CRM.TicketSlaManagement.Contracts.DTOs;

public sealed class TicketEscalationRunDto
{
    public Guid Id { get; init; }
    public Guid TicketId { get; init; }
    public Guid EscalationRuleId { get; init; }
    public string MetricType { get; init; } = string.Empty;
    public DateTime ExecutedAtUtc { get; init; }
    public string Note { get; init; } = string.Empty;
}
