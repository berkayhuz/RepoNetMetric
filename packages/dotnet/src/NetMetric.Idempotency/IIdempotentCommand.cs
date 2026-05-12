namespace NetMetric.Idempotency;

public interface IIdempotentCommand
{
    string? IdempotencyKey { get; }
}
