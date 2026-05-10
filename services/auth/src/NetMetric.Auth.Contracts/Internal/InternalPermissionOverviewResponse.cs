namespace NetMetric.Auth.Contracts.Internal;

public sealed record InternalPermissionOverviewResponse(
    Guid? OrganizationId,
    DateTimeOffset GeneratedAt,
    bool MayBeStale,
    IReadOnlyCollection<string> Roles,
    IReadOnlyCollection<InternalPermissionGroupResponse> PermissionGroups);
