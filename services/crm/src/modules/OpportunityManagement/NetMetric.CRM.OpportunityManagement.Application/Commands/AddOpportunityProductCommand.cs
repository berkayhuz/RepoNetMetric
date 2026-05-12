using MediatR;
using NetMetric.CRM.OpportunityManagement.Contracts.DTOs;

namespace NetMetric.CRM.OpportunityManagement.Application.Commands;

public sealed record AddOpportunityProductCommand(Guid OpportunityId, Guid ProductId, int Quantity, decimal UnitPrice, decimal DiscountRate, decimal VatRate) : IRequest<OpportunityProductDto>;
