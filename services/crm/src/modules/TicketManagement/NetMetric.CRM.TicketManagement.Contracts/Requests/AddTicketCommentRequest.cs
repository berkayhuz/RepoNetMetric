namespace NetMetric.CRM.TicketManagement.Contracts.Requests;

public sealed class AddTicketCommentRequest
{
    public string Comment { get; set; } = null!;
    public bool IsInternal { get; set; }
}
