using MediatR;
using NetMetric.CRM.CustomerManagement.Contracts.DTOs;

namespace NetMetric.CRM.CustomerManagement.Application.Queries.Customers;

public sealed record GetCustomerByIdQuery(Guid CustomerId) : IRequest<CustomerDetailDto?>;
