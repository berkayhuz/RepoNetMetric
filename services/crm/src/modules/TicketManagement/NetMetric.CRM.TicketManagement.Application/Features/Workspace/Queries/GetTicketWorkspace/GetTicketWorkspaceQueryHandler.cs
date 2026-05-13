using MediatR;
using NetMetric.CRM.TicketManagement.Application.Features.Timeline.Queries.GetTicketTimeline;
using NetMetric.CRM.TicketManagement.Application.Queries.Categories;
using NetMetric.CRM.TicketManagement.Application.Queries.Tickets;
using NetMetric.CRM.TicketManagement.Contracts.DTOs;

namespace NetMetric.CRM.TicketManagement.Application.Features.Workspace.Queries.GetTicketWorkspace;

public sealed class GetTicketWorkspaceQueryHandler(IMediator mediator) : IRequestHandler<GetTicketWorkspaceQuery, TicketWorkspaceDto?>
{
    public async Task<TicketWorkspaceDto?> Handle(GetTicketWorkspaceQuery request, CancellationToken cancellationToken)
    {
        var ticket = await mediator.Send(new GetTicketByIdQuery(request.TicketId), cancellationToken);
        if (ticket is null)
            return null;

        var timeline = await mediator.Send(new GetTicketTimelineQuery(request.TicketId), cancellationToken);
        var categories = await mediator.Send(new GetTicketCategoriesQuery(), cancellationToken);

        return new TicketWorkspaceDto(ticket, timeline, categories);
    }
}
