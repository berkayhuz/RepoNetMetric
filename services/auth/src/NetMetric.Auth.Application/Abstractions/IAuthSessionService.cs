using NetMetric.Auth.Domain.Entities;

namespace NetMetric.Auth.Application.Abstractions;

public interface IAuthSessionService
{
    Task<IReadOnlyCollection<Guid>> EnforceSessionLimitsAsync(Guid tenantId, Guid userId, Guid? currentSessionId, CancellationToken cancellationToken);

    bool IsExpired(UserSession session, DateTime utcNow);
}
