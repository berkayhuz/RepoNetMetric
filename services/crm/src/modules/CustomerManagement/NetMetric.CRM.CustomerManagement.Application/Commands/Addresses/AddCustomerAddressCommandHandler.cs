using NetMetric.CRM.CustomerManagement.Application.Abstractions;
using NetMetric.CRM.CustomerManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Addresses;

public sealed class AddCustomerAddressCommandHandler(IAddressAdministrationService administrationService)
    : IRequestHandler<AddCustomerAddressCommand, AddressDto>
{
    public Task<AddressDto> Handle(AddCustomerAddressCommand request, CancellationToken cancellationToken)
        => administrationService.AddToCustomerAsync(request, cancellationToken);
}
