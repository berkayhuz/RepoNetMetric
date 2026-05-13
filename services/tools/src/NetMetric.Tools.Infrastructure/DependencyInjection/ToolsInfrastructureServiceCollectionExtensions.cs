using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NetMetric.Tools.Application.Abstractions.Security;
using NetMetric.Tools.Application.Abstractions.Storage;
using NetMetric.Tools.Infrastructure.Options;
using NetMetric.Tools.Infrastructure.Security;
using NetMetric.Tools.Infrastructure.Storage;

namespace NetMetric.Tools.Infrastructure.DependencyInjection;

public static class ToolsInfrastructureServiceCollectionExtensions
{
    public static IServiceCollection AddToolsInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        services.AddScoped<ICurrentUserAccessor, HttpCurrentUserAccessor>();

        services
            .AddOptions<ToolsArtifactStorageOptions>()
            .Bind(configuration.GetSection(ToolsArtifactStorageOptions.SectionName))
            .Validate(options => !string.IsNullOrWhiteSpace(options.RootPath), "Artifact storage root path is required.")
            .ValidateOnStart();

        services.AddSingleton<IToolArtifactStorage, LocalToolArtifactStorage>();

        return services;
    }
}
