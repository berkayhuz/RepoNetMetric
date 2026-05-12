using NetMetric.CRM.Types;

namespace NetMetric.CRM.TicketManagement.Contracts.Requests;

public sealed class ChangeTicketPriorityRequest
{
    public PriorityType Priority { get; set; }
}
