namespace NetMetric.Auth.Application.Records;

public sealed record SecurityAlert(
    string Category,
    string Severity,
    string Message,
    Guid TenantId,
    Guid? UserId,
    Guid? SessionId,
    string? CorrelationId,
    string? TraceId,
    string? Metadata = null);
