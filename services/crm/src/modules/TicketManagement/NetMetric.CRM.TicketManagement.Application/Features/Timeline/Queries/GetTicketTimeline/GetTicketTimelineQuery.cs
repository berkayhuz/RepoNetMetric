using NetMetric.CRM.TicketManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.TicketManagement.Application.Features.Timeline.Queries.GetTicketTimeline;

public sealed record GetTicketTimelineQuery(Guid TicketId) : IRequest<IReadOnlyList<TicketTimelineEventDto>>;
