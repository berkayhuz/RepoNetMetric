using MediatR;
using NetMetric.Auth.Contracts.Internal;
using NetMetric.Auth.Contracts.Responses;

namespace NetMetric.Auth.Application.Features.Commands;

public sealed record CreateWorkspaceCommand(
    Guid CurrentTenantId,
    Guid UserId,
    string Name,
    string? Culture,
    string? IpAddress,
    string? UserAgent,
    string? CorrelationId,
    string? TraceId) : IRequest<AuthenticationTokenResponse>;

public sealed record SwitchWorkspaceCommand(
    Guid CurrentTenantId,
    Guid TargetTenantId,
    Guid UserId,
    string? IpAddress,
    string? UserAgent,
    string? CorrelationId,
    string? TraceId) : IRequest<AuthenticationTokenResponse>;

public sealed record ListUserWorkspaceMembershipsCommand(
    Guid TenantId,
    Guid UserId) : IRequest<IReadOnlyCollection<InternalOrganizationMembershipSummaryResponse>>;

public sealed record GetUserWorkspacePermissionsCommand(
    Guid TenantId,
    Guid UserId,
    Guid? OrganizationId) : IRequest<InternalPermissionOverviewResponse>;
