namespace NetMetric.Auth.Contracts.Responses;

public sealed record SessionSummaryResponse(
    Guid SessionId,
    bool IsCurrent,
    bool IsRevoked,
    string? IpAddress,
    string? UserAgent,
    DateTime CreatedAt,
    DateTime? LastSeenAt,
    DateTime RefreshTokenExpiresAt,
    DateTime? RevokedAt,
    string? RevokedReason);
