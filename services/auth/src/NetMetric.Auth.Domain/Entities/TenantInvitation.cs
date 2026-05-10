using NetMetric.Auth.Domain.Common;

namespace NetMetric.Auth.Domain.Entities;

public sealed class TenantInvitation : EntityBase
{
    public Guid InvitedByUserId { get; set; }
    public string Email { get; set; } = null!;
    public string NormalizedEmail { get; set; } = null!;
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string TokenHash { get; set; } = null!;
    public DateTime ExpiresAtUtc { get; set; }
    public DateTime? AcceptedAtUtc { get; set; }
    public Guid? AcceptedByUserId { get; set; }
    public DateTime? RevokedAtUtc { get; set; }
    public Guid? RevokedByUserId { get; set; }
    public int ResendCount { get; set; }
    public DateTime? LastSentAtUtc { get; set; }
    public DateTime? LastDeliveryAttemptAtUtc { get; set; }
    public string? LastDeliveryStatus { get; set; }
    public string? LastDeliveryErrorCode { get; set; }
    public string? LastDeliveryCorrelationId { get; set; }
    public string Roles { get; set; } = "tenant-user";
    public string Permissions { get; set; } = "session:self,profile:self";
    public bool IsPending(DateTime utcNow) =>
        AcceptedAtUtc is null && RevokedAtUtc is null && !IsDeleted && IsActive && ExpiresAtUtc > utcNow;
    public string GetStatus(DateTime utcNow)
    {
        if (AcceptedAtUtc is not null)
        {
            return "accepted";
        }

        if (RevokedAtUtc is not null || !IsActive || IsDeleted)
        {
            return "revoked";
        }

        return ExpiresAtUtc <= utcNow ? "expired" : "pending";
    }
}
