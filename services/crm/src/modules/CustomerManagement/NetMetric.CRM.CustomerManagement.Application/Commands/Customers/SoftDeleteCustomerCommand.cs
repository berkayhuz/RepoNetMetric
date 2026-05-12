using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Customers;

public sealed record SoftDeleteCustomerCommand(Guid CustomerId) : IRequest<Unit>;
