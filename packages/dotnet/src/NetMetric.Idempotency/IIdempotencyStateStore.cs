namespace NetMetric.Idempotency;

public interface IIdempotencyStateStore
{
    Task<IdempotencyState?> GetAsync(string key, CancellationToken cancellationToken);

    Task<bool> TryMarkInProgressAsync(string key, string requestHash, TimeSpan ttl, CancellationToken cancellationToken);

    Task MarkCompletedAsync(string key, string requestHash, string responseJson, TimeSpan ttl, CancellationToken cancellationToken);

    Task RemoveAsync(string key, CancellationToken cancellationToken);
}
