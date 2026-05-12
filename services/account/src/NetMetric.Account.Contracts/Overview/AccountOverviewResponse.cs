using NetMetric.Account.Contracts.Organizations;

namespace NetMetric.Account.Contracts.Overview;

public sealed record AccountOverviewResponse(
    string DisplayName,
    string? AvatarUrl,
    bool IsMfaEnabled,
    int ActiveSessionCount,
    IReadOnlyCollection<OrganizationMembershipSummaryResponse> Organizations,
    DateTimeOffset? LastSecurityEventAt);
