namespace NetMetric.CRM.SupportInboxIntegration.Application.Abstractions.Services;

public interface ISupportInboxSynchronizationService
{
    Task RunAsync(Guid connectionId, bool dryRun, CancellationToken cancellationToken = default);
}
