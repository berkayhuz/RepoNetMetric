using NetMetric.CRM.AnalyticsReporting.Application.Results;

namespace NetMetric.CRM.AnalyticsReporting.Application.Abstractions;

public interface IAnalyticsProjectionService
{
    Task<AnalyticsProjectionResult> RunOnceAsync(CancellationToken cancellationToken);
}
