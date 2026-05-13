namespace NetMetric.Auth.Contracts.Requests;

public sealed record ForgotPasswordRequest(Guid TenantId, string Email);
