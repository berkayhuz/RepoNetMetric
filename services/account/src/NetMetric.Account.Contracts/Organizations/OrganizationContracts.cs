namespace NetMetric.Account.Contracts.Organizations;

public sealed record OrganizationMembershipSummaryResponse(
    Guid OrganizationId,
    Guid TenantId,
    string OrganizationName,
    string? OrganizationSlug,
    string Status,
    bool IsDefault,
    DateTimeOffset JoinedAt,
    DateTimeOffset? LastPermissionRefreshAt,
    IReadOnlyCollection<string> Roles);

public sealed record PermissionOverviewResponse(
    Guid? OrganizationId,
    DateTimeOffset GeneratedAt,
    bool MayBeStale,
    IReadOnlyCollection<string> Roles,
    IReadOnlyCollection<PermissionGroupResponse> PermissionGroups);

public sealed record PermissionGroupResponse(string Group, IReadOnlyCollection<string> Permissions);
