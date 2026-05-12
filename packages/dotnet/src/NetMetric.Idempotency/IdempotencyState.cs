namespace NetMetric.Idempotency;

public sealed record IdempotencyState(
    IdempotencyStatus Status,
    string RequestHash,
    string ResponseJson)
{
    public static IdempotencyState InProgress(string requestHash)
        => new(IdempotencyStatus.InProgress, requestHash, string.Empty);

    public static IdempotencyState Completed(string requestHash, string responseJson)
        => new(IdempotencyStatus.Completed, requestHash, responseJson);
}
