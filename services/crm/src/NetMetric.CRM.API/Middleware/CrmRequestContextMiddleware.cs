using System.Diagnostics;
using System.Diagnostics.Metrics;
using NetMetric.AspNetCore.RequestContext;

namespace NetMetric.CRM.API.Middleware;

public sealed class CrmRequestContextMiddleware(
    RequestDelegate next,
    ILogger<CrmRequestContextMiddleware> logger)
{
    private static readonly Meter Meter = new("NetMetric.CRM.API");
    private static readonly Histogram<double> RequestDuration = Meter.CreateHistogram<double>(
        "crm_api_request_duration_ms",
        "ms",
        "Duration of CRM API requests.");

    public async Task InvokeAsync(HttpContext context)
    {
        var stopwatch = Stopwatch.StartNew();
        using var scope = RequestContextSupport.BeginScope(context, logger);

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
                context.Request.Path,
                stopwatch.Elapsed.TotalMilliseconds,
                "crm-api");
        }
    }
}
