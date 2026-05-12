namespace NetMetric.CRM.LeadManagement.Contracts.Requests;

public sealed class BulkSoftDeleteLeadsRequest
{
    public IReadOnlyCollection<Guid> LeadIds { get; set; } = Array.Empty<Guid>();
}
