using NetMetric.CRM.CustomerManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Queries.Customers;

public sealed record GetCustomerByIdQuery(Guid CustomerId) : IRequest<CustomerDetailDto?>;
