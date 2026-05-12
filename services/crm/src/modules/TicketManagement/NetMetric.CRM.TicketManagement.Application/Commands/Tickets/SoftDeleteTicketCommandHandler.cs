using NetMetric.CRM.TicketManagement.Application.Abstractions.Services;
using MediatR;

namespace NetMetric.CRM.TicketManagement.Application.Commands.Tickets;

public sealed class SoftDeleteTicketCommandHandler(ITicketAdministrationService administrationService) : IRequestHandler<SoftDeleteTicketCommand>
{
    public async Task<Unit> Handle(SoftDeleteTicketCommand request, CancellationToken cancellationToken)
    {
        await administrationService.SoftDeleteAsync(request, cancellationToken);
        return Unit.Value;
    }

    Task IRequestHandler<SoftDeleteTicketCommand>.Handle(SoftDeleteTicketCommand request, CancellationToken cancellationToken)
    {
        return Handle(request, cancellationToken);
    }
}
