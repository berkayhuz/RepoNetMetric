namespace NetMetric.Auth.Application.Abstractions;

public interface IClock
{
    DateTime UtcNow { get; }
}