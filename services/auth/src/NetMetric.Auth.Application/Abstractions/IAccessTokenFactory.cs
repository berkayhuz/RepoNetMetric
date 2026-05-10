using NetMetric.Auth.Domain.Entities;
using NetMetric.Auth.Application.Descriptors;

namespace NetMetric.Auth.Application.Abstractions;

public interface IAccessTokenFactory
{
    AccessTokenDescriptor Create(User user, Guid tenantId, Guid sessionId);
    AccessTokenDescriptor Create(
        Guid userId,
        string userName,
        string email,
        int tokenVersion,
        IReadOnlyCollection<string> roles,
        IReadOnlyCollection<string> permissions,
        Guid tenantId,
        Guid sessionId);
}
