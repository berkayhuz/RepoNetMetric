using NetMetric.CRM.CustomerManagement.Application.DTOs.Timeline;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Timeline.Queries.GetEntityTimeline;

public sealed class GetEntityTimelineQuery : IRequest<IReadOnlyList<TimelineEventDto>>
{
    public required string EntityName { get; init; }
    public required Guid EntityId { get; init; }
    public int Take { get; init; } = 50;
}
