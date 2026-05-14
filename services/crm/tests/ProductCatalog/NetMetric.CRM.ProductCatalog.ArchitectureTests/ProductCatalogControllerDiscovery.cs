using Microsoft.AspNetCore.Mvc;
using NetMetric.CRM.API.Controllers.Catalogs;

namespace NetMetric.CRM.ProductCatalog.ArchitectureTests;

internal static class ProductCatalogControllerDiscovery
{
    public static IReadOnlyList<Type> GetControllerTypes()
    {
        var apiAssembly = typeof(CatalogProductsController).Assembly;

        return apiAssembly.GetTypes()
            .Where(type =>
                type is { IsClass: true, IsAbstract: false } &&
                typeof(ControllerBase).IsAssignableFrom(type) &&
                type.Namespace == "NetMetric.CRM.API.Controllers.Catalogs" &&
                type.Name.Contains("CatalogProduct", StringComparison.Ordinal))
            .ToList();
    }
}
