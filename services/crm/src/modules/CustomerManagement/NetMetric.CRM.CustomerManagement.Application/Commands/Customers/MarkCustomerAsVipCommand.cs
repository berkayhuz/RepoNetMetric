using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Customers;

public sealed record MarkCustomerAsVipCommand(Guid CustomerId, bool IsVip) : IRequest<Unit>;
