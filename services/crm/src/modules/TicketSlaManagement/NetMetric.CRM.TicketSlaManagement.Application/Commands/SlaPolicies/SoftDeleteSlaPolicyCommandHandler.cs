using MediatR;
using NetMetric.CRM.TicketSlaManagement.Application.Abstractions.Services;

namespace NetMetric.CRM.TicketSlaManagement.Application.Commands.SlaPolicies;

public sealed class SoftDeleteSlaPolicyCommandHandler(ITicketSlaAdministrationService service) : IRequestHandler<SoftDeleteSlaPolicyCommand>
{
    public Task Handle(SoftDeleteSlaPolicyCommand request, CancellationToken cancellationToken) =>
        service.SoftDeletePolicyAsync(request.Id, cancellationToken);
}
