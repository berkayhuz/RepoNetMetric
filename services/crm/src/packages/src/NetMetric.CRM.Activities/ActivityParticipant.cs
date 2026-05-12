namespace NetMetric.CRM.Activities;

public class ActivityParticipant : AuditableEntity
{
    public Guid ActivityId { get; set; }
    public Activity? Activity { get; set; }
    public Guid ParticipantId { get; set; }
}
