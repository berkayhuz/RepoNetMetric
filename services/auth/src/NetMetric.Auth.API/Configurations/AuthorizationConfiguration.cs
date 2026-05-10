using Microsoft.AspNetCore.Authorization;
using NetMetric.Auth.API.Permissions;
using AuthorizationOptions = NetMetric.Auth.Application.Options.AuthorizationOptions;

namespace NetMetric.Auth.API.Configurations;

public static class AuthorizationConfiguration
{
    public static IServiceCollection AddNetMetricAuthorization(
        this IServiceCollection services,
        AuthorizationOptions options)
    {
        services.AddSingleton<IAuthorizationHandler, PermissionAuthorizationHandler>();

        services.AddAuthorization(builder =>
        {
            builder.AddPolicy("tenant-user", policy =>
            {
                policy.RequireAuthenticatedUser();
                policy.RequireClaim("tenant_id");
            });

            foreach (var definition in options.Policies)
            {
                builder.AddPolicy(definition.Name, policy =>
                {
                    if (definition.RequireAuthenticatedUser)
                    {
                        policy.RequireAuthenticatedUser();
                    }

                    if (definition.RequireTenantClaim)
                    {
                        policy.RequireClaim("tenant_id");
                    }

                    foreach (var permission in definition.RequiredPermissions)
                    {
                        policy.Requirements.Add(new PermissionRequirement(permission));
                    }

                    if (definition.RequiredRoles.Length > 0)
                    {
                        policy.RequireRole(definition.RequiredRoles);
                    }
                });
            }
        });

        return services;
    }
}