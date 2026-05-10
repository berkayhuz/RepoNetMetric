namespace NetMetric.Auth.Contracts.Requests;

public sealed record RefreshTokenRequest(
    Guid TenantId,
    Guid SessionId,
    string RefreshToken);