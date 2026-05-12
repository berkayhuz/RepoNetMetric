using NetMetric.CRM.DealManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.DealManagement.Application.Queries.Deals;

public sealed record GetDealTimelineQuery(Guid DealId) : IRequest<IReadOnlyList<DealOutcomeHistoryDto>>;