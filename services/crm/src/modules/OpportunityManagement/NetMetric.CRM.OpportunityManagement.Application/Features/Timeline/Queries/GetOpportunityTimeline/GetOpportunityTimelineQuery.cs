using NetMetric.CRM.OpportunityManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.OpportunityManagement.Application.Features.Timeline.Queries.GetOpportunityTimeline;

public sealed record GetOpportunityTimelineQuery(Guid OpportunityId) : IRequest<IReadOnlyList<OpportunityTimelineEventDto>>;