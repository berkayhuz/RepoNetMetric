using NetMetric.CRM.CustomerManagement.Application.Commands.Addresses;
using NetMetric.CRM.CustomerManagement.Contracts.DTOs;

namespace NetMetric.CRM.CustomerManagement.Application.Abstractions;

public interface IAddressAdministrationService
{
    Task<AddressDto> AddToCompanyAsync(AddCompanyAddressCommand request, CancellationToken cancellationToken = default);
    Task<AddressDto> AddToCustomerAsync(AddCustomerAddressCommand request, CancellationToken cancellationToken = default);
    Task<AddressDto> UpdateAsync(UpdateAddressCommand request, CancellationToken cancellationToken = default);
    Task SetDefaultAsync(Guid addressId, CancellationToken cancellationToken = default);
    Task SoftDeleteAsync(Guid addressId, CancellationToken cancellationToken = default);
}
