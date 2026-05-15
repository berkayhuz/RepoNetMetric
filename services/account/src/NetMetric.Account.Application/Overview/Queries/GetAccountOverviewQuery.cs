// <copyright file="GetAccountOverviewQuery.cs" company="NetMetric">
// Copyright (c) 2026 NetMetric. All rights reserved.
// NetMetric is proprietary software. See the LICENSE file in the repository root.
// </copyright>

using MediatR;
using Microsoft.EntityFrameworkCore;
using NetMetric.Account.Application.Abstractions.Identity;
using NetMetric.Account.Application.Abstractions.Membership;
using NetMetric.Account.Application.Abstractions.Persistence;
using NetMetric.Account.Application.Abstractions.Security;
using NetMetric.Account.Application.Common;
using NetMetric.Account.Contracts.Overview;
using NetMetric.Account.Domain.Common;
using NetMetric.Account.Domain.Profiles;
using NetMetric.Account.Domain.Sessions;
using NetMetric.Clock;

namespace NetMetric.Account.Application.Overview.Queries;

public sealed record GetAccountOverviewQuery : IRequest<Result<AccountOverviewResponse>>;

public sealed class GetAccountOverviewQueryHandler(
    ICurrentUserAccessor currentUserAccessor,
    IClock clock,
    IRepository<IAccountDbContext, UserProfile> profiles,
    IRepository<IAccountDbContext, UserSession> sessions,
    IIdentityAccountClient identityAccountClient,
    IMembershipReadService membershipReadService)
    : IRequestHandler<GetAccountOverviewQuery, Result<AccountOverviewResponse>>
{
    public async Task<Result<AccountOverviewResponse>> Handle(GetAccountOverviewQuery request, CancellationToken cancellationToken)
    {
        var currentUser = currentUserAccessor.GetRequired();
        var tenantId = TenantId.From(currentUser.TenantId);
        var userId = UserId.From(currentUser.UserId);

        var profile = await profiles.Query
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.TenantId == tenantId && x.UserId == userId, cancellationToken);

        var activeSessionCount = await sessions.Query
            .AsNoTracking()
            .CountAsync(
                x => x.TenantId == tenantId && x.UserId == userId && x.RevokedAt == null && x.ExpiresAt > clock.UtcNow,
                cancellationToken);

        var security = await identityAccountClient.GetSecuritySummaryAsync(currentUser.TenantId, currentUser.UserId, cancellationToken);
        var organizations = await membershipReadService.GetMyOrganizationsAsync(currentUser.TenantId, currentUser.UserId, cancellationToken);

        var response = new AccountOverviewResponse(
            profile?.DisplayName ?? string.Empty,
            profile?.AvatarUrl,
            security.IsMfaEnabled,
            activeSessionCount,
            organizations,
            security.LastSecurityEventAt);

        return Result<AccountOverviewResponse>.Success(response);
    }
}
