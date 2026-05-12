using NetMetric.CRM.TicketSlaManagement.Application.Abstractions.Services;
using MediatR;

namespace NetMetric.CRM.TicketSlaManagement.Application.Commands.Escalations;

public sealed class UpdateSlaEscalationRuleCommandHandler(ITicketSlaAdministrationService service) : IRequestHandler<UpdateSlaEscalationRuleCommand>
{
    public Task Handle(UpdateSlaEscalationRuleCommand request, CancellationToken cancellationToken) =>
        service.UpdateEscalationRuleAsync(
            request.Id,
            request.SlaPolicyId,
            request.MetricType,
            request.TriggerBeforeOrAfterMinutes,
            request.ActionType,
            request.TargetTeamId,
            request.TargetUserId,
            request.IsEnabled,
            cancellationToken);
}