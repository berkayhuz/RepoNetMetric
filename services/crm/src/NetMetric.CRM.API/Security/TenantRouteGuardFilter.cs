using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using NetMetric.CurrentUser;

namespace NetMetric.CRM.API.Security;

public sealed class TenantRouteGuardFilter(ICurrentUserService currentUserService) : IAsyncActionFilter
{
    private static readonly string[] TenantArgumentNames = ["tenantId", "TenantId"];

    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        foreach (var argumentName in TenantArgumentNames)
        {
            if (!context.ActionArguments.TryGetValue(argumentName, out var value))
            {
                continue;
            }

            if (value is not Guid requestedTenantId || requestedTenantId == Guid.Empty)
            {
                context.Result = new BadRequestObjectResult(new
                {
                    error = "tenant_id_invalid",
                    message = "A valid tenant id is required."
                });
                return;
            }

            var currentTenantId = currentUserService.TenantId;
            if (currentTenantId == Guid.Empty || currentTenantId != requestedTenantId)
            {
                context.Result = new ObjectResult(new
                {
                    error = "tenant_mismatch",
                    message = "Requested tenant does not match the authenticated tenant."
                })
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
                return;
            }
        }

        await next();
    }
}
