namespace NetMetric.Auth.Contracts.Responses;

public sealed record AuthenticationTokenResponse(
    string AccessToken,
    DateTime AccessTokenExpiresAt,
    string RefreshToken,
    DateTime RefreshTokenExpiresAt,
    Guid TenantId,
    Guid UserId,
    string UserName,
    string Email,
    Guid SessionId);
