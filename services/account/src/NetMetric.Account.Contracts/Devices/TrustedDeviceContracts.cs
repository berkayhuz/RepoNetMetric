namespace NetMetric.Account.Contracts.Devices;

public sealed record TrustedDeviceResponse(
    Guid Id,
    string Name,
    string? IpAddress,
    string UserAgent,
    DateTimeOffset TrustedAt,
    DateTimeOffset ExpiresAt,
    bool IsCurrent,
    bool IsActive);

public sealed record TrustedDevicesResponse(IReadOnlyCollection<TrustedDeviceResponse> Items);
