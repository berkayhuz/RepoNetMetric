using NetMetric.CRM.Core;

namespace NetMetric.CRM.CustomerManagement.Application.Abstractions.Integration;

public interface ICustomerManagementOutbox
{
    Task EnqueueCustomerCreatedAsync(Customer customer, CancellationToken cancellationToken);

    Task EnqueueCustomerUpdatedAsync(Customer customer, CancellationToken cancellationToken);

    Task EnqueueCustomerDeletedAsync(Customer customer, CancellationToken cancellationToken);

    Task EnqueueContactCreatedAsync(Contact contact, CancellationToken cancellationToken);

    Task EnqueueContactUpdatedAsync(Contact contact, CancellationToken cancellationToken);

    Task EnqueueContactDeletedAsync(Contact contact, CancellationToken cancellationToken);

    Task EnqueuePrimaryContactChangedAsync(Contact contact, CancellationToken cancellationToken);
}
