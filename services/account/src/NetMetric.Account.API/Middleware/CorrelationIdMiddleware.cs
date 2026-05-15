// <copyright file="CorrelationIdMiddleware.cs" company="NetMetric">
// Copyright (c) 2026 NetMetric. All rights reserved.
// NetMetric is proprietary software. See the LICENSE file in the repository root.
// </copyright>

using System.Diagnostics;

namespace NetMetric.Account.Api.Middleware;

public sealed class CorrelationIdMiddleware(RequestDelegate next)
{
    public const string HeaderName = "X-Correlation-Id";

    public async Task InvokeAsync(HttpContext context)
    {
        var correlationId = context.Request.Headers.TryGetValue(HeaderName, out var header) &&
            !string.IsNullOrWhiteSpace(header)
            ? header.ToString()
            : context.TraceIdentifier;

        context.Items[HeaderName] = correlationId;
        context.Response.Headers[HeaderName] = correlationId;

        using var scope = context.RequestServices
            .GetRequiredService<ILogger<CorrelationIdMiddleware>>()
            .BeginScope(new Dictionary<string, object?>
            {
                ["CorrelationId"] = correlationId,
                ["TraceId"] = Activity.Current?.TraceId.ToString() ?? context.TraceIdentifier
            });

        await next(context);
    }
}
