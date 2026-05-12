using NetMetric.CRM.DealManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.DealManagement.Application.Commands.Deals;

public sealed record CreateDealCommand(string DealCode, string Name, decimal TotalAmount, DateTime ClosedDate, Guid? OpportunityId, Guid? CompanyId, Guid? OwnerUserId, string? Notes) : IRequest<DealDetailDto>;