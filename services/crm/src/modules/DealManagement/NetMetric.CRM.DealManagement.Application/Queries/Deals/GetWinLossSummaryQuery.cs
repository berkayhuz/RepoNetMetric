using NetMetric.CRM.DealManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.DealManagement.Application.Queries.Deals;

public sealed record GetWinLossSummaryQuery(DateTime? From, DateTime? To, Guid? OwnerUserId) : IRequest<WinLossSummaryDto>;