using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NetMetric.CRM.MarketingAutomation.Application.Abstractions;

namespace NetMetric.CRM.MarketingAutomation.Infrastructure.Processing;

public sealed class MarketingAutomationBackgroundService(
    IServiceScopeFactory scopeFactory,
    IOptions<MarketingAutomationOptions> options,
    ILogger<MarketingAutomationBackgroundService> logger) : BackgroundService
{
    private readonly MarketingAutomationOptions _options = options.Value;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        if (!_options.WorkerEnabled)
        {
            logger.LogInformation("Marketing automation worker is disabled by configuration.");
            return;
        }

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                using var scope = scopeFactory.CreateScope();
                var scheduler = scope.ServiceProvider.GetRequiredService<IMarketingCampaignScheduler>();
                var journeyExecutor = scope.ServiceProvider.GetRequiredService<IMarketingJourneyExecutor>();
                await scheduler.ScheduleDueCampaignsAsync(stoppingToken);
                await scheduler.ProcessDueDeliveriesAsync(stoppingToken);
                await journeyExecutor.ProcessDueStepsAsync(stoppingToken);
            }
            catch (Exception exception) when (exception is not OperationCanceledException || !stoppingToken.IsCancellationRequested)
            {
                logger.LogError(exception, "Marketing automation worker loop failed.");
            }

            await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);
        }
    }
}
