using NetMetric.Auth.Domain.Common;

namespace NetMetric.Auth.Domain.Entities;

public sealed class AuthAuditEvent : EntityBase
{
    public Guid? UserId { get; set; }
    public Guid? SessionId { get; set; }
    public string EventType { get; set; } = null!;
    public string Outcome { get; set; } = null!;
    public string? Identity { get; set; }
    public string? IpAddress { get; set; }
    public string? UserAgent { get; set; }
    public string? CorrelationId { get; set; }
    public string? TraceId { get; set; }
    public string? Metadata { get; set; }
}
