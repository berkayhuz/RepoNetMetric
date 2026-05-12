using NetMetric.CRM.CustomerManagement.Application.Abstractions;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Contacts;

public sealed class SoftDeleteContactCommandHandler(IContactAdministrationService administrationService)
    : IRequestHandler<SoftDeleteContactCommand, Unit>
{
    public async Task<Unit> Handle(SoftDeleteContactCommand request, CancellationToken cancellationToken)
    {
        await administrationService.SoftDeleteAsync(request.ContactId, cancellationToken);
        return Unit.Value;
    }
}
