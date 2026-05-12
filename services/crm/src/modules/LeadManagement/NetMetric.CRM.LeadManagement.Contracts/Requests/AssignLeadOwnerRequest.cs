namespace NetMetric.CRM.LeadManagement.Contracts.Requests;

public sealed class AssignLeadOwnerRequest
{
    public Guid? OwnerUserId { get; set; }
}
