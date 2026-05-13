using MediatR;
using NetMetric.CRM.OpportunityManagement.Contracts.DTOs;

namespace NetMetric.CRM.OpportunityManagement.Application.Features.Timeline.Queries.GetOpportunityTimeline;

public sealed record GetOpportunityTimelineQuery(Guid OpportunityId) : IRequest<IReadOnlyList<OpportunityTimelineEventDto>>;
