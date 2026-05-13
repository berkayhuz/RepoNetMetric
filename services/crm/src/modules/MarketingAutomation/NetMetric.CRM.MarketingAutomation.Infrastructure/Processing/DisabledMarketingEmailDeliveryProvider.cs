using NetMetric.CRM.MarketingAutomation.Application.Abstractions;

namespace NetMetric.CRM.MarketingAutomation.Infrastructure.Processing;

public sealed class DisabledMarketingEmailDeliveryProvider : IMarketingEmailDeliveryProvider
{
    public Task<MarketingEmailDeliveryProviderResult> SendAsync(MarketingEmailDeliveryProviderRequest request, CancellationToken cancellationToken)
        => Task.FromException<MarketingEmailDeliveryProviderResult>(
            new InvalidOperationException("Marketing email delivery provider is not configured."));
}
