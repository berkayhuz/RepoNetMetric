namespace NetMetric.Auth.Contracts.Requests;

public sealed record ConfirmEmailRequest(Guid TenantId, Guid UserId, string Token);
