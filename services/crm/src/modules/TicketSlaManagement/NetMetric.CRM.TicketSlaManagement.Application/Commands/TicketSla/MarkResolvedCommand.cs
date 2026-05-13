using MediatR;
using NetMetric.CRM.TicketSlaManagement.Contracts.Requests;

namespace NetMetric.CRM.TicketSlaManagement.Application.Commands.TicketSla;

public sealed record MarkResolvedCommand(Guid TicketId, DateTime ResolvedAtUtc) : IRequest
{
    public static MarkResolvedCommand FromRequest(MarkResolvedRequest request) => new(request.TicketId, request.ResolvedAtUtc);
}
