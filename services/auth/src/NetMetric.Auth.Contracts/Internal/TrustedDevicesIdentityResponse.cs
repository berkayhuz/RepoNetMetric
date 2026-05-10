namespace NetMetric.Auth.Contracts.Internal;

public sealed record TrustedDevicesIdentityResponse(IReadOnlyCollection<TrustedDeviceIdentityResponse> Items);
