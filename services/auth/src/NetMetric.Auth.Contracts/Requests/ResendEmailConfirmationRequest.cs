namespace NetMetric.Auth.Contracts.Requests;

public sealed record ResendEmailConfirmationRequest(Guid TenantId, string Email);
