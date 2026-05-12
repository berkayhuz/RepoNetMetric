using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Options;
using NetMetric.Auth.Application.Abstractions;
using NetMetric.Auth.Application.Descriptors;
using NetMetric.Auth.Application.Options;
using NetMetric.Auth.Domain.Entities;
using NetMetric.Clock;

namespace NetMetric.Auth.Infrastructure.Services;

public sealed class JwtAccessTokenFactory(
    IOptions<JwtOptions> jwtOptions,
    IClock clock,
    ITokenSigningKeyProvider tokenSigningKeyProvider) : IAccessTokenFactory
{
    public AccessTokenDescriptor Create(User user, Guid tenantId, Guid sessionId)
        => Create(
            user.Id,
            user.UserName,
            user.Email ?? string.Empty,
            user.TokenVersion,
            user.GetRoles(),
            user.GetPermissions(),
            tenantId,
            sessionId);

    public AccessTokenDescriptor Create(
        Guid userId,
        string userName,
        string email,
        int tokenVersion,
        IReadOnlyCollection<string> roles,
        IReadOnlyCollection<string> permissions,
        Guid tenantId,
        Guid sessionId)
    {
        var utcNow = clock.UtcDateTime;
        var expiresAt = utcNow.AddMinutes(jwtOptions.Value.AccessTokenMinutes);
        var credentials = tokenSigningKeyProvider.GetCurrentSigningCredentials();

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, userId.ToString()),
            new(JwtRegisteredClaimNames.UniqueName, userName),
            new(JwtRegisteredClaimNames.Email, email),
            new("tenant_id", tenantId.ToString()),
            new(JwtRegisteredClaimNames.Sid, sessionId.ToString()),
            new("token_version", tokenVersion.ToString()),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N"))
        };

        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));
        claims.AddRange(permissions.Select(permission => new Claim("permission", permission)));

        var token = new JwtSecurityToken(
            issuer: jwtOptions.Value.Issuer,
            audience: jwtOptions.Value.Audience,
            claims: claims,
            notBefore: utcNow,
            expires: expiresAt,
            signingCredentials: credentials);
        token.Header["kid"] = tokenSigningKeyProvider.CurrentKeyId;

        return new AccessTokenDescriptor(new JwtSecurityTokenHandler().WriteToken(token), expiresAt);
    }
}
