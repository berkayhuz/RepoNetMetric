using NetMetric.CRM.Types;

namespace NetMetric.CRM.LeadManagement.Contracts.Requests;

public sealed class ChangeLeadStatusRequest
{
    public LeadStatusType Status { get; set; }
}
