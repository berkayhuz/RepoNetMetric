using NetMetric.CRM.CustomerManagement.Domain.Outbox;

namespace NetMetric.CRM.CustomerManagement.Infrastructure.Outbox;

public interface ICustomerManagementOutboxPublisher
{
    Task PublishAsync(CustomerManagementOutboxMessage message, CancellationToken cancellationToken);
}
