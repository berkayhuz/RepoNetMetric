namespace NetMetric.Auth.Application.Abstractions;

public interface IUserTokenStateValidator
{
    Task<bool> IsValidAsync(Guid tenantId, Guid userId, int tokenVersion, CancellationToken cancellationToken);

    void Evict(Guid tenantId, Guid userId);
}