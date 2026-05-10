namespace NetMetric.Auth.Contracts.Requests;

public sealed record ConfirmEmailChangeRequest(Guid TenantId, Guid UserId, string NewEmail, string Token);
