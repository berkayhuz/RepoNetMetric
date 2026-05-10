namespace NetMetric.Auth.Application.Records;

public sealed record AuthAuditRecord(
    Guid TenantId,
    string EventType,
    string Outcome,
    Guid? UserId,
    Guid? SessionId,
    string? Identity,
    string? IpAddress,
    string? UserAgent,
    string? CorrelationId,
    string? TraceId,
    string? Metadata = null);
