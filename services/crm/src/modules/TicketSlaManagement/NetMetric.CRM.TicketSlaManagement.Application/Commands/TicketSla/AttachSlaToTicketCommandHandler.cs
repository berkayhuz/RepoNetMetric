using MediatR;
using NetMetric.CRM.TicketSlaManagement.Application.Abstractions.Services;

namespace NetMetric.CRM.TicketSlaManagement.Application.Commands.TicketSla;

public sealed class AttachSlaToTicketCommandHandler(ITicketSlaAdministrationService service) : IRequestHandler<AttachSlaToTicketCommand>
{
    public Task Handle(AttachSlaToTicketCommand request, CancellationToken cancellationToken) =>
        service.AttachPolicyToTicketAsync(request.TicketId, request.SlaPolicyId, request.CreatedAtUtc, cancellationToken);
}
