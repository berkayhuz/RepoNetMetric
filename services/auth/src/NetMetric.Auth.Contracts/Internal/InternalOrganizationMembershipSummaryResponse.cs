namespace NetMetric.Auth.Contracts.Internal;

public sealed record InternalOrganizationMembershipSummaryResponse(
    Guid OrganizationId,
    Guid TenantId,
    string OrganizationName,
    string? OrganizationSlug,
    string Status,
    bool IsDefault,
    DateTimeOffset JoinedAt,
    DateTimeOffset? LastPermissionRefreshAt,
    IReadOnlyCollection<string> Roles);
