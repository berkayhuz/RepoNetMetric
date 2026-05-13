using MediatR;
using NetMetric.CRM.FinanceOperations.Contracts.DTOs;

namespace NetMetric.CRM.FinanceOperations.Application.Features.Orders.Commands.CreateSalesOrder;

public sealed record CreateSalesOrderCommand(
    string Code,
    string Name,
    string? Description) : IRequest<FinanceOperationsSummaryDto>;
