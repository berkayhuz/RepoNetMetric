using MediatR;
using NetMetric.CRM.Types;

namespace NetMetric.CRM.TicketManagement.Application.Commands.Tickets;

public sealed record ChangeTicketStatusCommand(Guid TicketId, TicketStatusType Status, string? Note) : IRequest;
