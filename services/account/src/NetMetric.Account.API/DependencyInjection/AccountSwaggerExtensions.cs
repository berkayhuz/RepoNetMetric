using Microsoft.OpenApi;
using NetMetric.Account.Api.Options;

namespace NetMetric.Account.Api.DependencyInjection;

public static class AccountSwaggerExtensions
{
    public static IServiceCollection AddAccountSwagger(this IServiceCollection services, IConfiguration configuration)
    {
        var options = configuration.GetSection(AccountOpenApiOptions.SectionName).Get<AccountOpenApiOptions>() ?? new AccountOpenApiOptions();

        services.AddSwaggerGen(setup =>
        {
            setup.SwaggerDoc(options.Version, new OpenApiInfo
            {
                Title = options.Title,
                Version = options.Version
            });

            setup.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                Scheme = "bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header
            });

        });

        return services;
    }
}
