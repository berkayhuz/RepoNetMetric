namespace NetMetric.Auth.Contracts.Requests;

public sealed record LoginRequest(
    Guid? TenantId,
    string EmailOrUserName,
    string Password,
    string? MfaCode = null,
    string? RecoveryCode = null);
