using MediatR;
using NetMetric.CRM.TicketManagement.Application.Abstractions.Services;

namespace NetMetric.CRM.TicketManagement.Application.Commands.Tickets;

public sealed class ChangeTicketPriorityCommandHandler(ITicketAdministrationService administrationService) : IRequestHandler<ChangeTicketPriorityCommand>
{
    public async Task<Unit> Handle(ChangeTicketPriorityCommand request, CancellationToken cancellationToken)
    {
        await administrationService.ChangePriorityAsync(request, cancellationToken);
        return Unit.Value;
    }

    Task IRequestHandler<ChangeTicketPriorityCommand>.Handle(ChangeTicketPriorityCommand request, CancellationToken cancellationToken)
    {
        return Handle(request, cancellationToken);
    }
}
