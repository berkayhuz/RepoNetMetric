namespace NetMetric.CRM.CustomerManagement.Infrastructure.Outbox;

public interface ICustomerManagementOutboxProcessor
{
    Task<int> ProcessBatchAsync(CancellationToken cancellationToken);
}
