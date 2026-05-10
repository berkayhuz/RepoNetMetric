using NetMetric.Auth.Application.Descriptors;

namespace NetMetric.Auth.Application.Abstractions;

public interface IRefreshTokenService
{
    RefreshTokenDescriptor Generate();
    bool Verify(string refreshToken, string refreshTokenHash);
}