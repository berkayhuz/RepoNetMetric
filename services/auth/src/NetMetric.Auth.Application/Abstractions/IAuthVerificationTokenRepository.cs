using NetMetric.Auth.Domain.Entities;

namespace NetMetric.Auth.Application.Abstractions;

public interface IAuthVerificationTokenRepository
{
    Task AddAsync(AuthVerificationToken token, CancellationToken cancellationToken);
    Task<AuthVerificationToken?> GetValidAsync(
        Guid tenantId,
        Guid userId,
        string purpose,
        string tokenHash,
        DateTime utcNow,
        CancellationToken cancellationToken);

    Task RevokeOutstandingAsync(
        Guid tenantId,
        Guid userId,
        string purpose,
        DateTime utcNow,
        string? target,
        CancellationToken cancellationToken);
}
