using NetMetric.Entities;

namespace NetMetric.CRM.CustomerIntelligence.Domain.Entities.BehavioralEvents;

public sealed class BehavioralEvent : AuditableEntity
{
    public string Source { get; set; } = null!;
    public string EventName { get; set; } = null!;
    public string SubjectType { get; set; } = null!;
    public Guid SubjectId { get; set; }
    public string? IdentityKey { get; set; }
    public string? Channel { get; set; }
    public string? PropertiesJson { get; set; }
    public DateTime OccurredAtUtc { get; set; } = DateTime.UtcNow;
}
