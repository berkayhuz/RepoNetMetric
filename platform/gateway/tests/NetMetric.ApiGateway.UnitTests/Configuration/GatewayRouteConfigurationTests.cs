// <copyright file="GatewayRouteConfigurationTests.cs" company="NetMetric">
// Copyright (c) 2026 NetMetric. All rights reserved.
// NetMetric is proprietary software. See the LICENSE file in the repository root.
// </copyright>

using System.Text.Json;
using FluentAssertions;

namespace NetMetric.ApiGateway.UnitTests.Configuration;

public sealed class GatewayRouteConfigurationTests
{
    [Fact]
    public void Production_Config_Should_Expose_Tools_Api_Through_Gateway()
    {
        using var document = JsonDocument.Parse(File.ReadAllText(FindRepoFile("platform/gateway/src/NetMetric.ApiGateway/appsettings.Production.json")));
        var root = document.RootElement;

        var routes = root.GetProperty("ReverseProxy").GetProperty("Routes");
        var clusters = root.GetProperty("ReverseProxy").GetProperty("Clusters");

        routes.TryGetProperty("tools-api-route", out var toolsRoute).Should().BeTrue();
        toolsRoute.GetProperty("ClusterId").GetString().Should().Be("tools-api-cluster");
        toolsRoute.GetProperty("Match").GetProperty("Path").GetString().Should().Be("/api/v1/tools/{**catch-all}");
        clusters.TryGetProperty("tools-api-cluster", out _).Should().BeTrue();
    }

    [Fact]
    public void Production_Config_Should_Not_Require_Tenant_Forwarding_For_Anonymous_Auth_Route()
    {
        using var document = JsonDocument.Parse(File.ReadAllText(FindRepoFile("platform/gateway/src/NetMetric.ApiGateway/appsettings.Production.json")));

        var metadata = document.RootElement
            .GetProperty("ReverseProxy")
            .GetProperty("Routes")
            .GetProperty("auth-api-route")
            .GetProperty("Metadata");

        metadata.GetProperty("TenantForwarding").GetString().Should().Be("false");
    }

    private static string FindRepoFile(string relativePath)
    {
        var directory = new DirectoryInfo(AppContext.BaseDirectory);
        while (directory is not null)
        {
            var candidate = Path.Combine(directory.FullName, relativePath);
            if (File.Exists(candidate))
            {
                return candidate;
            }

            directory = directory.Parent;
        }

        throw new FileNotFoundException($"Could not find repository file '{relativePath}'.");
    }
}
