namespace NetMetric.CRM.SupportInboxIntegration.Contracts.Requests;

public sealed class SupportInboxRuleUpsertRequest
{
    public Guid ConnectionId { get; set; }
    public string Name { get; set; } = null!;
    public string? MatchSender { get; set; }
    public string? MatchSubjectContains { get; set; }
    public Guid? AssignToQueueId { get; set; }
    public Guid? TicketCategoryId { get; set; }
    public Guid? SlaPolicyId { get; set; }
    public bool AutoCreateTicket { get; set; }
    public bool IsActive { get; set; } = true;
}
