using MediatR;
using NetMetric.CRM.CustomerManagement.Application.Abstractions;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Addresses;

public sealed class SoftDeleteAddressCommandHandler(IAddressAdministrationService administrationService)
    : IRequestHandler<SoftDeleteAddressCommand, Unit>
{
    public async Task<Unit> Handle(SoftDeleteAddressCommand request, CancellationToken cancellationToken)
    {
        await administrationService.SoftDeleteAsync(request.AddressId, cancellationToken);
        return Unit.Value;
    }
}
