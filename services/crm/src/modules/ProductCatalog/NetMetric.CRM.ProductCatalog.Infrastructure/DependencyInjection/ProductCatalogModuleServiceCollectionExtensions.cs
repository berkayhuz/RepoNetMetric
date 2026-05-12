using FluentValidation;
using NetMetric.CRM.ProductCatalog.Application.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using NetMetric.CRM.ProductCatalog.Application.Abstractions.Persistence;
using NetMetric.CRM.ProductCatalog.Application.Features.Products.Commands.CreateCatalogProduct;
using NetMetric.CRM.ProductCatalog.Infrastructure.Health;
using NetMetric.CRM.ProductCatalog.Infrastructure.Persistence;

namespace NetMetric.CRM.ProductCatalog.Infrastructure.DependencyInjection;

public static class ProductCatalogModuleServiceCollectionExtensions
{
    public static IServiceCollection AddProductCatalogModule(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("ProductCatalogConnection")
            ?? configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("ProductCatalogConnection connection string not found.");

        services.AddDbContext<ProductCatalogDbContext>(options =>
        {
            options.UseSqlServer(connectionString, sql => sql.MigrationsAssembly(typeof(ProductCatalogDbContext).Assembly.FullName));
        });

        services.AddScoped<IProductCatalogDbContext>(sp => sp.GetRequiredService<ProductCatalogDbContext>());
        services.AddScoped<CatalogItemService>();
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(CreateCatalogProductCommandHandler).Assembly));
        services.AddValidatorsFromAssemblyContaining<CreateCatalogProductCommandValidator>();

        services.AddHealthChecks()
            .AddCheck<ProductCatalogDbContextHealthCheck>(
                name: "catalog-db",
                failureStatus: HealthStatus.Unhealthy,
                tags: ["ready", "db", "catalog"]);

        return services;
    }
}
