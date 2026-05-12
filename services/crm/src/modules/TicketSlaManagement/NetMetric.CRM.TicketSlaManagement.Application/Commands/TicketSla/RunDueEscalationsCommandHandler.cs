using NetMetric.CRM.TicketSlaManagement.Application.Abstractions.Services;
using MediatR;

namespace NetMetric.CRM.TicketSlaManagement.Application.Commands.TicketSla;

public sealed class RunDueEscalationsCommandHandler(ITicketSlaAdministrationService service) : IRequestHandler<RunDueEscalationsCommand, int>
{
    public Task<int> Handle(RunDueEscalationsCommand request, CancellationToken cancellationToken) =>
        service.RunDueEscalationsAsync(request.UtcNow, cancellationToken);
}
