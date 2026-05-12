using NetMetric.CRM.LeadManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.LeadManagement.Application.Features.Timeline.Queries.GetLeadTimeline;

public sealed record GetLeadTimelineQuery(Guid LeadId) : IRequest<IReadOnlyList<LeadTimelineEventDto>>;
