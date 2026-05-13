using NetMetric.CRM.CustomerManagement.Application.Commands.Customers;
using NetMetric.CRM.CustomerManagement.Contracts.DTOs;

namespace NetMetric.CRM.CustomerManagement.Application.Abstractions;

public interface ICustomerAdministrationService
{
    Task<CustomerDetailDto> CreateAsync(CreateCustomerCommand request, CancellationToken cancellationToken = default);
    Task<CustomerDetailDto> UpdateAsync(UpdateCustomerCommand request, CancellationToken cancellationToken = default);
    Task MarkVipAsync(Guid customerId, bool isVip, CancellationToken cancellationToken = default);
    Task SoftDeleteAsync(Guid customerId, CancellationToken cancellationToken = default);
}
