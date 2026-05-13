namespace NetMetric.CRM.TicketSlaManagement.Domain.Enums;

public enum SlaBreachActionType
{
    None = 0,
    NotifyOwner = 1,
    NotifyManager = 2,
    ReassignQueue = 3,
    IncreasePriority = 4,
    EscalateToTeam = 5
}
