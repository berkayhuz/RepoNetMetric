using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NetMetric.Tools.Application.Abstractions.Persistence;

namespace NetMetric.Tools.Persistence.DependencyInjection;

public static class ToolsPersistenceServiceCollectionExtensions
{
    public static IServiceCollection AddToolsPersistence(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<ToolsDbContext>(options =>
        {
            options.UseSqlServer(connectionString, sqlOptions =>
            {
                sqlOptions.MigrationsAssembly(typeof(ToolsDbContext).Assembly.FullName);
                sqlOptions.EnableRetryOnFailure(3);
            });
        });

        services.AddScoped<IToolsDbContext>(provider => provider.GetRequiredService<ToolsDbContext>());
        return services;
    }
}
