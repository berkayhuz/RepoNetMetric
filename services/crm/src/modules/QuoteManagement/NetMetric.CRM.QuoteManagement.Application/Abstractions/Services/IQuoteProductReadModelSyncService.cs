namespace NetMetric.CRM.QuoteManagement.Application.Abstractions.Services;

public interface IQuoteProductReadModelSyncService
{
    Task SyncAsync(IReadOnlyCollection<Guid> productIds, CancellationToken cancellationToken);
}
