namespace NetMetric.CRM.LeadManagement.Contracts.Requests;

public sealed class BulkAssignLeadOwnerRequest
{
    public IReadOnlyCollection<Guid> LeadIds { get; set; } = Array.Empty<Guid>();
    public Guid? OwnerUserId { get; set; }
}
