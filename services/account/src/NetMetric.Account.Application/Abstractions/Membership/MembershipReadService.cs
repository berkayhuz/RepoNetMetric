using NetMetric.Account.Contracts.Organizations;

namespace NetMetric.Account.Application.Abstractions.Membership;

public interface IMembershipReadService
{
    Task<IReadOnlyCollection<OrganizationMembershipSummaryResponse>> GetMyOrganizationsAsync(
        Guid tenantId,
        Guid userId,
        CancellationToken cancellationToken = default);

    Task<PermissionOverviewResponse> GetMyPermissionsAsync(
        Guid tenantId,
        Guid userId,
        Guid? organizationId,
        CancellationToken cancellationToken = default);
}
