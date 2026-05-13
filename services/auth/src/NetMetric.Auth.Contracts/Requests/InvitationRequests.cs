namespace NetMetric.Auth.Contracts.Requests;

public sealed record CreateTenantInvitationRequest(
    string Email,
    string? FirstName,
    string? LastName);

public sealed record AcceptTenantInvitationRequest(
    Guid TenantId,
    string Token,
    string UserName,
    string Email,
    string Password,
    string? FirstName,
    string? LastName);
