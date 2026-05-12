using NetMetric.CRM.CustomerIntelligence.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.CustomerIntelligence.Application.Features.Customer360.Queries.GetCustomer360Workspace;

public sealed record GetCustomer360WorkspaceQuery(Guid CustomerId) : IRequest<Customer360WorkspaceDto>;
