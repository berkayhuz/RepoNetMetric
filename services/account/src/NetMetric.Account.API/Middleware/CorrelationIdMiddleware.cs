// <copyright file="CorrelationIdMiddleware.cs" company="NetMetric">
// Copyright (c) 2026 NetMetric. All rights reserved.
// NetMetric is proprietary software. See the LICENSE file in the repository root.
// </copyright>

using System.Diagnostics;
using System.Diagnostics.Metrics;
using NetMetric.AspNetCore.RequestContext;

namespace NetMetric.Account.Api.Middleware;

public sealed class CorrelationIdMiddleware(RequestDelegate next)
{
    private static readonly Histogram<double> RequestDuration = AccountApiDiagnosticsMeter.Instance.CreateHistogram<double>(
        "account.request.duration",
        unit: "ms",
        description: "Account API request latency");

    public async Task InvokeAsync(HttpContext context)
    {
        var logger = context.RequestServices.GetRequiredService<ILogger<CorrelationIdMiddleware>>();
        using var scope = RequestContextSupport.BeginScope(context, logger);
        var stopwatch = Stopwatch.StartNew();
        try
        {
            await next(context);
        }
        finally
        {
            stopwatch.Stop();
            RequestContextSupport.RecordCompletion(
                context,
                logger,
                RequestDuration,
                "unmatched",
                stopwatch.Elapsed.TotalMilliseconds,
                "account");
        }
    }
}

internal static class AccountApiDiagnosticsMeter
{
    public static readonly Meter Instance = new("NetMetric.Account.API.Requests");
}
