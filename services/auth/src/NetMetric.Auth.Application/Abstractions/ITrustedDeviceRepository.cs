using NetMetric.Auth.Domain.Entities;

namespace NetMetric.Auth.Application.Abstractions;

public interface ITrustedDeviceRepository
{
    Task<IReadOnlyCollection<TrustedDevice>> ListForUserAsync(Guid tenantId, Guid userId, CancellationToken cancellationToken);
    Task<bool> RevokeAsync(Guid tenantId, Guid userId, Guid deviceId, DateTime utcNow, string reason, CancellationToken cancellationToken);
}
