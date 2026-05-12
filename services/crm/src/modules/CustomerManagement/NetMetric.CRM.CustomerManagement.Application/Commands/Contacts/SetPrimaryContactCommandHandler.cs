using NetMetric.CRM.CustomerManagement.Application.Abstractions;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Contacts;

public sealed class SetPrimaryContactCommandHandler(IContactAdministrationService administrationService)
    : IRequestHandler<SetPrimaryContactCommand, Unit>
{
    public async Task<Unit> Handle(SetPrimaryContactCommand request, CancellationToken cancellationToken)
    {
        await administrationService.SetPrimaryAsync(request.ContactId, cancellationToken);
        return Unit.Value;
    }
}
