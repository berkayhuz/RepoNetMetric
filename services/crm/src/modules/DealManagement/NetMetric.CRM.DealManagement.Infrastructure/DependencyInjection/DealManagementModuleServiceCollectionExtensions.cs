using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using NetMetric.CRM.DealManagement.Application.Abstractions.Persistence;
using NetMetric.CRM.DealManagement.Application.Handlers;
using NetMetric.CRM.DealManagement.Domain.Common;
using NetMetric.CRM.DealManagement.Infrastructure.Health;
using NetMetric.CRM.DealManagement.Infrastructure.Persistence;

namespace NetMetric.CRM.DealManagement.Infrastructure.DependencyInjection;

public static class DealManagementModuleServiceCollectionExtensions
{
    public static IServiceCollection AddDealManagementModule(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DealManagementConnection")
            ?? configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("DealManagementConnection connection string not found.");

        services.AddDbContext<DealManagementDbContext>(options =>
        {
            options.UseSqlServer(connectionString, sql => sql.MigrationsAssembly(typeof(DealManagementDbContext).Assembly.FullName));
        });

        services.AddScoped<IDealManagementDbContext>(sp => sp.GetRequiredService<DealManagementDbContext>());
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(CreateDealCommandHandler).Assembly));
        services.AddValidatorsFromAssembly(typeof(IDealManagementModuleMarker).Assembly);
        services.AddValidatorsFromAssembly(typeof(CreateDealCommandHandler).Assembly);
        services.AddHealthChecks().AddCheck<DealManagementDbContextHealthCheck>(
        name: "deal-management-db",
        failureStatus: HealthStatus.Unhealthy,
        tags: ["ready", "db", "deal-management"]);

        return services;
    }
}