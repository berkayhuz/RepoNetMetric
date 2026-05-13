using MediatR;
using NetMetric.CRM.CustomerManagement.Application.Abstractions;
using NetMetric.CRM.CustomerManagement.Contracts.DTOs;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Customers;

public sealed class CreateCustomerCommandHandler(ICustomerAdministrationService administrationService)
    : IRequestHandler<CreateCustomerCommand, CustomerDetailDto>
{
    public Task<CustomerDetailDto> Handle(CreateCustomerCommand request, CancellationToken cancellationToken)
        => administrationService.CreateAsync(request, cancellationToken);
}
