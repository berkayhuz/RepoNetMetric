using NetMetric.CRM.AnalyticsReporting.Application.Batchs;

namespace NetMetric.CRM.AnalyticsReporting.Application.Abstractions;

public interface IAnalyticsProjectionSource
{
    Task<AnalyticsProjectionBatch> ReadAsync(CancellationToken cancellationToken);
}
