using System.Diagnostics;
using System.Diagnostics.Metrics;
using NetMetric.AspNetCore.RequestContext;

namespace NetMetric.Auth.API.Middlewares;

public sealed class RequestContextMiddleware(RequestDelegate next, ILogger<RequestContextMiddleware> logger)
{
    private static readonly Histogram<double> RequestDuration = AuthApiDiagnosticsMeter.Instance.CreateHistogram<double>(
        "auth.request.duration",
        unit: "ms",
        description: "Authentication API request latency");

    public async Task InvokeAsync(HttpContext context)
    {
        using var scope = RequestContextSupport.BeginScope(context, logger);
        var stopwatch = Stopwatch.StartNew();

        try
        {
            await next(context);
        }
        finally
        {
            stopwatch.Stop();
            RequestContextSupport.RecordCompletion(context, logger, RequestDuration, "unmatched", stopwatch.Elapsed.TotalMilliseconds, "auth");
        }
    }

    public static string GetOrCreateCorrelationId(HttpContext context) => RequestContextSupport.GetOrCreateCorrelationId(context);
}

internal static class AuthApiDiagnosticsMeter
{
    public static readonly Meter Instance = new("NetMetric.Auth.API.Requests");
}
