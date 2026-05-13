using MediatR;
using NetMetric.CRM.TicketSlaManagement.Contracts.Requests;

namespace NetMetric.CRM.TicketSlaManagement.Application.Commands.TicketSla;

public sealed record MarkFirstResponseCommand(Guid TicketId, DateTime RespondedAtUtc) : IRequest
{
    public static MarkFirstResponseCommand FromRequest(MarkFirstResponseRequest request) => new(request.TicketId, request.RespondedAtUtc);
}
