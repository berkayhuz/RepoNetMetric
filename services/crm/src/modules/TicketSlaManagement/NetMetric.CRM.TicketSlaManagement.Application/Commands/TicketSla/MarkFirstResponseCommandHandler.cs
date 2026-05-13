using MediatR;
using NetMetric.CRM.TicketSlaManagement.Application.Abstractions.Services;

namespace NetMetric.CRM.TicketSlaManagement.Application.Commands.TicketSla;

public sealed class MarkFirstResponseCommandHandler(ITicketSlaAdministrationService service) : IRequestHandler<MarkFirstResponseCommand>
{
    public Task Handle(MarkFirstResponseCommand request, CancellationToken cancellationToken) =>
        service.MarkFirstResponseAsync(request.TicketId, request.RespondedAtUtc, cancellationToken);
}
