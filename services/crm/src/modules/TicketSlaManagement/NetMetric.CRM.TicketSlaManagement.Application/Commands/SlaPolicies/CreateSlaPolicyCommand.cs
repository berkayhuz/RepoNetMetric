using MediatR;
using NetMetric.CRM.TicketSlaManagement.Contracts.Requests;

namespace NetMetric.CRM.TicketSlaManagement.Application.Commands.SlaPolicies;

public sealed record CreateSlaPolicyCommand(
    string Name,
    Guid? TicketCategoryId,
    int Priority,
    int FirstResponseTargetMinutes,
    int ResolutionTargetMinutes,
    bool IsDefault) : IRequest<Guid>
{
    public static CreateSlaPolicyCommand FromRequest(SlaPolicyUpsertRequest request) =>
        new(request.Name, request.TicketCategoryId, request.Priority, request.FirstResponseTargetMinutes, request.ResolutionTargetMinutes, request.IsDefault);
}
