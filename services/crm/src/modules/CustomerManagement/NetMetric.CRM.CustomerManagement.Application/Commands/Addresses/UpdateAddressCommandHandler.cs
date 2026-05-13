using MediatR;
using NetMetric.CRM.CustomerManagement.Application.Abstractions;
using NetMetric.CRM.CustomerManagement.Contracts.DTOs;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Addresses;

public sealed class UpdateAddressCommandHandler(IAddressAdministrationService administrationService)
    : IRequestHandler<UpdateAddressCommand, AddressDto>
{
    public Task<AddressDto> Handle(UpdateAddressCommand request, CancellationToken cancellationToken)
        => administrationService.UpdateAsync(request, cancellationToken);
}
