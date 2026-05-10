namespace NetMetric.Auth.Contracts.Internal;

public sealed record TrustedDeviceIdentityResponse(
    Guid Id,
    bool IsCurrent,
    string? DeviceName,
    string? IpAddress,
    string? UserAgent,
    DateTimeOffset TrustedAt,
    DateTimeOffset? LastSeenAt,
    bool IsRevoked);
