namespace NetMetric.CRM.SupportInboxIntegration.Contracts.Requests;

public sealed class TriggerSupportInboxSyncRequest
{
    public Guid ConnectionId { get; set; }
    public bool DryRun { get; set; }
}
