using Microsoft.Extensions.DependencyInjection;

namespace NetMetric.Tools.Application.DependencyInjection;

public static class ToolsApplicationServiceCollectionExtensions
{
    public static IServiceCollection AddToolsApplication(this IServiceCollection services)
    {
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(ToolsApplicationServiceCollectionExtensions).Assembly));
        return services;
    }
}
