using MediatR;
using NetMetric.CRM.FinanceOperations.Contracts.DTOs;

namespace NetMetric.CRM.FinanceOperations.Application.Features.Orders.Queries.GetSalesOrderById;

public sealed record GetSalesOrderByIdQuery(Guid Id) : IRequest<FinanceOperationsSummaryDto?>;
