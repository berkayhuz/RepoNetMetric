namespace NetMetric.Clock;

public interface IClock
{
    DateTimeOffset UtcNow { get; }
    DateTime UtcDateTime { get; }
}
