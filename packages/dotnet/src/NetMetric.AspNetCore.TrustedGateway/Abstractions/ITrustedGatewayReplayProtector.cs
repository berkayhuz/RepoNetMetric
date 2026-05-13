namespace NetMetric.AspNetCore.TrustedGateway.Abstractions;

public interface ITrustedGatewayReplayProtector
{
    Task<bool> TryRegisterAsync(string keyId, string nonce, TimeSpan ttl, CancellationToken cancellationToken);
}
