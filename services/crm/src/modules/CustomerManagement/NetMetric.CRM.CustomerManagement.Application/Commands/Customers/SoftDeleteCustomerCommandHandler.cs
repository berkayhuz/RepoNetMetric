using NetMetric.CRM.CustomerManagement.Application.Abstractions;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Customers;

public sealed class SoftDeleteCustomerCommandHandler(ICustomerAdministrationService administrationService)
    : IRequestHandler<SoftDeleteCustomerCommand, Unit>
{
    public async Task<Unit> Handle(SoftDeleteCustomerCommand request, CancellationToken cancellationToken)
    {
        await administrationService.SoftDeleteAsync(request.CustomerId, cancellationToken);
        return Unit.Value;
    }
}
