using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Options;
using NetMetric.Auth.Application.Abstractions;
using NetMetric.Auth.Application.Descriptors;
using NetMetric.Auth.Application.Options;

namespace NetMetric.Auth.Infrastructure.Services;

public sealed class RefreshTokenService(IOptions<JwtOptions> jwtOptions, IClock clock) : IRefreshTokenService
{
    public RefreshTokenDescriptor Generate()
    {
        Span<byte> bytes = stackalloc byte[64];
        RandomNumberGenerator.Fill(bytes);
        var token = Convert.ToBase64String(bytes);
        return new RefreshTokenDescriptor(token, Hash(token), clock.UtcNow.AddDays(jwtOptions.Value.RefreshTokenDays));
    }

    public bool Verify(string refreshToken, string refreshTokenHash)
    {
        var candidateHash = Hash(refreshToken);
        return CryptographicOperations.FixedTimeEquals(
            Encoding.UTF8.GetBytes(candidateHash),
            Encoding.UTF8.GetBytes(refreshTokenHash));
    }

    private static string Hash(string token)
    {
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(token));
        return Convert.ToHexString(bytes);
    }
}