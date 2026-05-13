namespace NetMetric.Auth.Application.Abstractions;

public interface IUserSessionStateValidator
{
    Task<bool> IsValidAsync(Guid tenantId, Guid userId, Guid sessionId, CancellationToken cancellationToken);

    void Evict(Guid tenantId, Guid sessionId);
}
