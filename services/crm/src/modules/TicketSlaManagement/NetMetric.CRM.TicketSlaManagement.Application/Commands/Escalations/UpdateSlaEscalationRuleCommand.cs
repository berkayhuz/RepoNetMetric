using NetMetric.CRM.TicketSlaManagement.Contracts.Requests;
using MediatR;

namespace NetMetric.CRM.TicketSlaManagement.Application.Commands.Escalations;

public sealed record UpdateSlaEscalationRuleCommand(
    Guid Id,
    Guid SlaPolicyId,
    string MetricType,
    int TriggerBeforeOrAfterMinutes,
    string ActionType,
    Guid? TargetTeamId,
    Guid? TargetUserId,
    bool IsEnabled) : IRequest
{
    public static UpdateSlaEscalationRuleCommand FromRequest(Guid id, SlaEscalationRuleUpsertRequest request) =>
        new(id, request.SlaPolicyId, request.MetricType, request.TriggerBeforeOrAfterMinutes, request.ActionType, request.TargetTeamId, request.TargetUserId, request.IsEnabled);
}