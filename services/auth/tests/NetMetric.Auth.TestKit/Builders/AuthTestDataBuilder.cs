using NetMetric.Auth.Application.Descriptors;
using NetMetric.Auth.Contracts.Responses;
using NetMetric.Auth.Domain.Entities;

namespace NetMetric.Auth.TestKit.Builders;

public static class AuthTestDataBuilder
{
    public static UserBuilder User() => new();

    public static LoginRequestBuilder LoginRequest() => new();

    public static RegisterRequestBuilder RegisterRequest() => new();

    public static AuthenticationTokenResponse TokenResponse(
        Guid? tenantId = null,
        Guid? userId = null,
        Guid? sessionId = null)
    {
        var now = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc);
        return new AuthenticationTokenResponse(
            "test-only-placeholder",
            now.AddMinutes(15),
            "test-only-placeholder",
            now.AddDays(14),
            tenantId ?? Guid.NewGuid(),
            userId ?? Guid.NewGuid(),
            "jane.doe",
            "jane.doe@example.com",
            sessionId ?? Guid.NewGuid());
    }

    public static AccessTokenDescriptor AccessTokenDescriptor(string token = "test-only-placeholder") =>
        new(token, new DateTime(2026, 1, 1, 0, 15, 0, DateTimeKind.Utc));

    public static RefreshTokenDescriptor RefreshTokenDescriptor(string token = "test-only-placeholder", string hash = "test-only-placeholder") =>
        new(token, hash, new DateTime(2026, 1, 15, 0, 0, 0, DateTimeKind.Utc));

    public static UserTenantMembership Membership(Guid tenantId, Guid userId, string roles = "tenant-user", string permissions = "session:self,profile:self") =>
        new()
        {
            TenantId = tenantId,
            UserId = userId,
            Roles = roles,
            Permissions = permissions,
            CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc),
            IsDeleted = false
        };
}
