using NetMetric.CRM.TicketManagement.Application.Abstractions.Services;
using NetMetric.CRM.TicketManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.TicketManagement.Application.Commands.Tickets;

public sealed class UpdateTicketCommandHandler(ITicketAdministrationService administrationService) : IRequestHandler<UpdateTicketCommand, TicketDetailDto>
{
    public Task<TicketDetailDto> Handle(UpdateTicketCommand request, CancellationToken cancellationToken)
        => administrationService.UpdateAsync(request, cancellationToken);
}
