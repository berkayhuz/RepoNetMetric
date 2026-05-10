using NetMetric.Auth.Application.Abstractions;

namespace NetMetric.Auth.TestKit.Fakes;

public sealed class FakeClock(DateTime? utcNow = null) : IClock
{
    private DateTime _utcNow = utcNow ?? new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc);

    public DateTime UtcNow => _utcNow;

    public void Set(DateTime utcNow)
    {
        _utcNow = DateTime.SpecifyKind(utcNow, DateTimeKind.Utc);
    }

    public void Advance(TimeSpan delta)
    {
        _utcNow = _utcNow.Add(delta);
    }
}

