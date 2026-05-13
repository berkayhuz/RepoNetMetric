namespace NetMetric.Account.Contracts.Preferences;

public sealed record UserPreferenceResponse(
    Guid Id,
    string Theme,
    string Language,
    string TimeZone,
    string DateFormat,
    Guid? DefaultOrganizationId,
    string Version);

public sealed record UpdateUserPreferenceRequest(
    string Theme,
    string Language,
    string TimeZone,
    string DateFormat,
    Guid? DefaultOrganizationId,
    string? Version);
