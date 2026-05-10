namespace NetMetric.Auth.Contracts.Requests;

public sealed record RegisterRequest(
    string TenantName,
    string UserName,
    string Email,
    string Password,
    string? FirstName,
    string? LastName,
    string? Culture = null);
