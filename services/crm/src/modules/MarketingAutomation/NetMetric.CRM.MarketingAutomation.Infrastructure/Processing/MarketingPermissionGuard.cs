using NetMetric.CRM.MarketingAutomation.Application.Abstractions;
using NetMetric.CurrentUser;

namespace NetMetric.CRM.MarketingAutomation.Infrastructure.Processing;

public sealed class MarketingPermissionGuard(ICurrentUserService currentUserService) : IMarketingPermissionGuard
{
    public void Ensure(string permission)
    {
        if (!currentUserService.IsAuthenticated || !currentUserService.HasPermission(permission))
        {
            throw new UnauthorizedAccessException($"Marketing automation requires permission '{permission}'.");
        }
    }
}
