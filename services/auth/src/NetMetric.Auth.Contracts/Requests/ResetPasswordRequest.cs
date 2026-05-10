namespace NetMetric.Auth.Contracts.Requests;

public sealed record ResetPasswordRequest(Guid TenantId, Guid UserId, string Token, string NewPassword);
