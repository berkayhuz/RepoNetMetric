using MediatR;
using NetMetric.CRM.CustomerManagement.Application.Abstractions;
using NetMetric.CRM.CustomerManagement.Contracts.DTOs;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Customers;

public sealed class UpdateCustomerCommandHandler(ICustomerAdministrationService administrationService)
    : IRequestHandler<UpdateCustomerCommand, CustomerDetailDto>
{
    public Task<CustomerDetailDto> Handle(UpdateCustomerCommand request, CancellationToken cancellationToken)
        => administrationService.UpdateAsync(request, cancellationToken);
}
