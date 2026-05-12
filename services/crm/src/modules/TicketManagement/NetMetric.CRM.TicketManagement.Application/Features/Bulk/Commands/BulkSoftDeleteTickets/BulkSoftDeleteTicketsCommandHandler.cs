using NetMetric.CRM.TicketManagement.Application.Abstractions.Services;
using MediatR;

namespace NetMetric.CRM.TicketManagement.Application.Features.Bulk.Commands.BulkSoftDeleteTickets;

public sealed class BulkSoftDeleteTicketsCommandHandler(ITicketAdministrationService administrationService) : IRequestHandler<BulkSoftDeleteTicketsCommand, int>
{
    public Task<int> Handle(BulkSoftDeleteTicketsCommand request, CancellationToken cancellationToken)
        => administrationService.BulkSoftDeleteAsync(request, cancellationToken);
}
