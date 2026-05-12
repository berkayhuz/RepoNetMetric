using NetMetric.CRM.TicketManagement.Application.Abstractions.Services;
using NetMetric.CRM.TicketManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.TicketManagement.Application.Commands.Tickets;

public sealed class CreateTicketCommandHandler(ITicketAdministrationService administrationService) : IRequestHandler<CreateTicketCommand, TicketDetailDto>
{
    public Task<TicketDetailDto> Handle(CreateTicketCommand request, CancellationToken cancellationToken)
        => administrationService.CreateAsync(request, cancellationToken);
}
