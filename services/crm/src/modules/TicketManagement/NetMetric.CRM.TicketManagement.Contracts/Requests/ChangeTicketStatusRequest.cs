using NetMetric.CRM.Types;

namespace NetMetric.CRM.TicketManagement.Contracts.Requests;

public sealed class ChangeTicketStatusRequest
{
    public TicketStatusType Status { get; set; }
    public string? Note { get; set; }
}
