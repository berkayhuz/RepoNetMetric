namespace NetMetric.Account.Contracts.Sessions;

public sealed record UserSessionResponse(
    Guid Id,
    string? DeviceName,
    string? IpAddress,
    string UserAgent,
    string? ApproximateLocation,
    DateTimeOffset CreatedAt,
    DateTimeOffset LastSeenAt,
    DateTimeOffset ExpiresAt,
    bool IsCurrent,
    bool IsActive);

public sealed record UserSessionsResponse(IReadOnlyCollection<UserSessionResponse> Items);
