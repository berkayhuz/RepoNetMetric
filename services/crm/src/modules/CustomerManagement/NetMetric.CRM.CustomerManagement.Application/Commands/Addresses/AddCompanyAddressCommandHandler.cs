using NetMetric.CRM.CustomerManagement.Application.Abstractions;
using NetMetric.CRM.CustomerManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Addresses;

public sealed class AddCompanyAddressCommandHandler(IAddressAdministrationService administrationService)
    : IRequestHandler<AddCompanyAddressCommand, AddressDto>
{
    public Task<AddressDto> Handle(AddCompanyAddressCommand request, CancellationToken cancellationToken)
        => administrationService.AddToCompanyAsync(request, cancellationToken);
}
