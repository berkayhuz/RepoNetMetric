using NetMetric.CRM.TicketSlaManagement.Application.Abstractions.Services;
using MediatR;

namespace NetMetric.CRM.TicketSlaManagement.Application.Commands.TicketSla;

public sealed class MarkResolvedCommandHandler(ITicketSlaAdministrationService service) : IRequestHandler<MarkResolvedCommand>
{
    public Task Handle(MarkResolvedCommand request, CancellationToken cancellationToken) =>
        service.MarkResolvedAsync(request.TicketId, request.ResolvedAtUtc, cancellationToken);
}
