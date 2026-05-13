using MediatR;
using NetMetric.CRM.TicketSlaManagement.Application.Abstractions.Services;

namespace NetMetric.CRM.TicketSlaManagement.Application.Commands.Escalations;

public sealed class CreateSlaEscalationRuleCommandHandler(ITicketSlaAdministrationService service) : IRequestHandler<CreateSlaEscalationRuleCommand, Guid>
{
    public Task<Guid> Handle(CreateSlaEscalationRuleCommand request, CancellationToken cancellationToken) =>
        service.CreateEscalationRuleAsync(request.ToEntity(), cancellationToken);
}
