using NetMetric.CRM.CustomerManagement.Application.Abstractions;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Customers;

public sealed class MarkCustomerAsVipCommandHandler(ICustomerAdministrationService administrationService)
    : IRequestHandler<MarkCustomerAsVipCommand, Unit>
{
    public async Task<Unit> Handle(MarkCustomerAsVipCommand request, CancellationToken cancellationToken)
    {
        await administrationService.MarkVipAsync(request.CustomerId, request.IsVip, cancellationToken);
        return Unit.Value;
    }
}
