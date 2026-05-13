namespace NetMetric.Account.Contracts.Profiles;

public sealed record MyProfileResponse(
    Guid Id,
    Guid TenantId,
    Guid UserId,
    string FirstName,
    string LastName,
    string DisplayName,
    string? PhoneNumber,
    string? AvatarUrl,
    string? JobTitle,
    string? Department,
    string TimeZone,
    string Culture,
    string Version);

public sealed record UpdateMyProfileRequest(
    string FirstName,
    string LastName,
    string? PhoneNumber,
    string? AvatarUrl,
    string? JobTitle,
    string? Department,
    string TimeZone,
    string Culture,
    string? Version);
