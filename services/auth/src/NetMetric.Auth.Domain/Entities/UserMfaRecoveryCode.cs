using NetMetric.Auth.Domain.Common;

namespace NetMetric.Auth.Domain.Entities;

public sealed class UserMfaRecoveryCode : EntityBase
{
    public Guid UserId { get; set; }
    public string CodeHash { get; set; } = null!;
    public DateTime? ConsumedAtUtc { get; set; }
    public string? ConsumedByIpAddress { get; set; }
    public User? User { get; set; }
    public bool IsConsumed => ConsumedAtUtc.HasValue;
    public void Consume(DateTime utcNow, string? ipAddress)
    {
        ConsumedAtUtc = utcNow;
        ConsumedByIpAddress = ipAddress;
        UpdatedAt = utcNow;
    }
}
