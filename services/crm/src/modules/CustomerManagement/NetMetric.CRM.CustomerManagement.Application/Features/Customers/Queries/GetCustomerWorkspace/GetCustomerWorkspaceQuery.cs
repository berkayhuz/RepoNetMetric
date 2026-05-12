using NetMetric.CRM.CustomerManagement.Application.DTOs.Customers;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Customers.Queries.GetCustomerWorkspace;

public sealed record GetCustomerWorkspaceQuery(Guid CustomerId) : IRequest<CustomerWorkspaceDto>;
