using MediatR;
using NetMetric.CRM.Types;

namespace NetMetric.CRM.TicketManagement.Application.Commands.Tickets;

public sealed record ChangeTicketPriorityCommand(Guid TicketId, PriorityType Priority) : IRequest;
