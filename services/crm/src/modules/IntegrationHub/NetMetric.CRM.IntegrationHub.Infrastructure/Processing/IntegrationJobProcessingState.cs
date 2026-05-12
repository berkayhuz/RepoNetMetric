using Microsoft.Extensions.Options;
using NetMetric.CRM.IntegrationHub.Application.Abstractions.Processing;

namespace NetMetric.CRM.IntegrationHub.Infrastructure.Processing;

public sealed class IntegrationJobProcessingState(IOptionsMonitor<IntegrationJobProcessingOptions> options) : IIntegrationJobProcessingState
{
    public bool IsEnabled => options.CurrentValue.Enabled;
}
