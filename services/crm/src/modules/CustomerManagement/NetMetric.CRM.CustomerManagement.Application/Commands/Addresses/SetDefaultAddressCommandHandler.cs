using NetMetric.CRM.CustomerManagement.Application.Abstractions;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Addresses;

public sealed class SetDefaultAddressCommandHandler(IAddressAdministrationService administrationService)
    : IRequestHandler<SetDefaultAddressCommand, Unit>
{
    public async Task<Unit> Handle(SetDefaultAddressCommand request, CancellationToken cancellationToken)
    {
        await administrationService.SetDefaultAsync(request.AddressId, cancellationToken);
        return Unit.Value;
    }
}
