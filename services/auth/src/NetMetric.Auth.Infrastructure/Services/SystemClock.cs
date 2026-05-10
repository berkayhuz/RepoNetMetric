using NetMetric.Auth.Application.Abstractions;

namespace NetMetric.Auth.Infrastructure.Services;

public sealed class SystemClock : IClock
{
    public DateTime UtcNow => DateTime.UtcNow;
}