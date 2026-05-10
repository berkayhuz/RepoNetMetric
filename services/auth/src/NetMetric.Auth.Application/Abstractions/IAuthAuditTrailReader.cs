namespace NetMetric.Auth.Application.Abstractions;

public interface IAuthAuditTrailReader
{
    Task<DateTimeOffset?> GetLastSecurityEventAtAsync(Guid tenantId, Guid userId, CancellationToken cancellationToken);
}
