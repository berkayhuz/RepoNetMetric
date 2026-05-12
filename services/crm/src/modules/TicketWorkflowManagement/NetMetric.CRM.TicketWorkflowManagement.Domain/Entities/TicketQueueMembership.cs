using NetMetric.Entities;
using NetMetric.Guards;

namespace NetMetric.CRM.TicketWorkflowManagement.Domain.Entities;

public sealed class TicketQueueMembership : EntityBase
{
    private TicketQueueMembership() { }

    public TicketQueueMembership(Guid queueId, Guid userId, string role)
    {
        QueueId = queueId;
        UserId = userId;
        Role = Guard.AgainstNullOrWhiteSpace(role);
    }

    public Guid QueueId { get; private set; }
    public TicketQueue Queue { get; private set; } = null!;
    public Guid UserId { get; private set; }
    public string Role { get; private set; } = null!;
}
