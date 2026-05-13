namespace NetMetric.Auth.Contracts.Requests;

public sealed record LogoutRequest(
    Guid TenantId,
    Guid SessionId,
    string RefreshToken);
