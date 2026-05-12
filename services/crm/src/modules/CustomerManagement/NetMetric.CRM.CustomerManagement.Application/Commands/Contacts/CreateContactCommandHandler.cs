using NetMetric.CRM.CustomerManagement.Application.Abstractions;
using NetMetric.CRM.CustomerManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Contacts;

public sealed class CreateContactCommandHandler(IContactAdministrationService administrationService)
    : IRequestHandler<CreateContactCommand, ContactDetailDto>
{
    public Task<ContactDetailDto> Handle(CreateContactCommand request, CancellationToken cancellationToken)
        => administrationService.CreateAsync(request, cancellationToken);
}
