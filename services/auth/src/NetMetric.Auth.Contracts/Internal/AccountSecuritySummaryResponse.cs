namespace NetMetric.Auth.Contracts.Internal;

public sealed record AccountSecuritySummaryResponse(
    bool IsMfaEnabled,
    DateTimeOffset? LastSecurityEventAt);
