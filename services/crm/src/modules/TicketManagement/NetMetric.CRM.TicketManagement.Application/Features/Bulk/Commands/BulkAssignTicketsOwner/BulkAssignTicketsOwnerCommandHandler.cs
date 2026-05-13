using MediatR;
using NetMetric.CRM.TicketManagement.Application.Abstractions.Services;

namespace NetMetric.CRM.TicketManagement.Application.Features.Bulk.Commands.BulkAssignTicketsOwner;

public sealed class BulkAssignTicketsOwnerCommandHandler(ITicketAdministrationService administrationService) : IRequestHandler<BulkAssignTicketsOwnerCommand, int>
{
    public Task<int> Handle(BulkAssignTicketsOwnerCommand request, CancellationToken cancellationToken)
        => administrationService.BulkAssignOwnerAsync(request, cancellationToken);
}
