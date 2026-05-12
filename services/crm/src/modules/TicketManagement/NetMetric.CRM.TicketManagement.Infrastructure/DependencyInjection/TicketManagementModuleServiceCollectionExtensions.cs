using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using NetMetric.CRM.TicketManagement.Application.Abstractions.Persistence;
using NetMetric.CRM.TicketManagement.Application.Abstractions.Services;
using NetMetric.CRM.TicketManagement.Application.Validators;
using NetMetric.CRM.TicketManagement.Infrastructure.Health;
using NetMetric.CRM.TicketManagement.Infrastructure.Persistence;
using NetMetric.CRM.TicketManagement.Infrastructure.Services;
using NetMetric.MediatR;
using NetMetric.Persistence.EntityFrameworkCore.Auditing;
using NetMetric.Persistence.EntityFrameworkCore.SoftDelete;
using NetMetric.Persistence.EntityFrameworkCore.Tenancy;

namespace NetMetric.CRM.TicketManagement.Infrastructure.DependencyInjection;

public static class TicketManagementModuleServiceCollectionExtensions
{
    public static IServiceCollection AddTicketManagementModule(this IServiceCollection services, IConfiguration configuration)
    {
        services.TryAddScoped<TenantIsolationSaveChangesInterceptor>();
        services.TryAddScoped<AuditSaveChangesInterceptor>();
        services.TryAddScoped<SoftDeleteSaveChangesInterceptor>();

        services.AddDbContext<TicketManagementDbContext>((sp, options) =>
        {
            var connectionString = configuration.GetConnectionString("TicketManagementConnection")
                ?? throw new InvalidOperationException("TicketManagementConnection connection string not found.");

            options.UseSqlServer(connectionString, sql =>
            {
                sql.MigrationsAssembly(typeof(TicketManagementDbContext).Assembly.FullName);
            });
        });

        services.AddScoped<ITicketManagementDbContext>(sp => sp.GetRequiredService<TicketManagementDbContext>());
        services.AddScoped<ITicketAdministrationService, TicketAdministrationService>();

        services.AddValidatorsFromAssemblyContaining<CreateTicketCommandValidator>();

        services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssembly(typeof(ITicketManagementDbContext).Assembly);
            cfg.AddOpenBehavior(typeof(ValidationBehavior<,>));
        });

        services.AddHealthChecks()
            .AddCheck<TicketManagementDbContextHealthCheck>(
                name: "ticket-management-db",
                failureStatus: HealthStatus.Unhealthy,
                tags: ["ready", "db", "ticket-management"]);

        return services;
    }
}
