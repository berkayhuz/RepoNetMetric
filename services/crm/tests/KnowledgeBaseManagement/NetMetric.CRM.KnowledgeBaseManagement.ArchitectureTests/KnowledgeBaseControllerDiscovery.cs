using Microsoft.AspNetCore.Mvc;
using NetMetric.CRM.API.Controllers.Knowledges;

namespace NetMetric.CRM.KnowledgeBaseManagement.ArchitectureTests;

internal static class KnowledgeBaseControllerDiscovery
{
    public static IReadOnlyList<Type> GetControllerTypes()
    {
        var apiAssembly = typeof(KnowledgeBaseArticlesController).Assembly;
        return apiAssembly.GetTypes().Where(type =>
            type is { IsClass: true, IsAbstract: false } &&
            typeof(ControllerBase).IsAssignableFrom(type) &&
            type.Namespace == "NetMetric.CRM.API.Controllers.Knowledges" &&
            type.Name.StartsWith("KnowledgeBase", StringComparison.Ordinal)).ToList();
    }
}
