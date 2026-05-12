using MediatR;

namespace NetMetric.CRM.TicketSlaManagement.Application.Commands.TicketSla;

public sealed record RunDueEscalationsCommand(DateTime UtcNow) : IRequest<int>;
