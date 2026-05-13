namespace NetMetric.Auth.Contracts.Responses;

public sealed record UserProfileResponse(
    Guid UserId,
    Guid TenantId,
    string UserName,
    string Email,
    bool EmailConfirmed,
    string? FirstName,
    string? LastName,
    IReadOnlyCollection<string> Roles,
    IReadOnlyCollection<string> Permissions,
    DateTime CreatedAt,
    DateTime? LastLoginAt,
    DateTime? PasswordChangedAt);
