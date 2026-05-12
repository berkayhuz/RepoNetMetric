using NetMetric.CRM.TicketSlaManagement.Contracts.Requests;
using MediatR;

namespace NetMetric.CRM.TicketSlaManagement.Application.Commands.SlaPolicies;

public sealed record UpdateSlaPolicyCommand(
    Guid Id,
    string Name,
    Guid? TicketCategoryId,
    int Priority,
    int FirstResponseTargetMinutes,
    int ResolutionTargetMinutes,
    bool IsDefault) : IRequest
{
    public static UpdateSlaPolicyCommand FromRequest(Guid id, SlaPolicyUpsertRequest request) =>
        new(id, request.Name, request.TicketCategoryId, request.Priority, request.FirstResponseTargetMinutes, request.ResolutionTargetMinutes, request.IsDefault);
}