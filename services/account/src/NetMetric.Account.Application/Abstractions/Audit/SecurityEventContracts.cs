namespace NetMetric.Account.Application.Abstractions.Audit;

public sealed record SecurityEventWriteRequest(
    Guid TenantId,
    Guid UserId,
    string EventType,
    string Severity,
    string? CorrelationId,
    string? IpAddress,
    string? UserAgent,
    IReadOnlyDictionary<string, string>? Metadata);

public interface ISecurityEventWriter
{
    Task WriteAsync(SecurityEventWriteRequest request, CancellationToken cancellationToken = default);
}
