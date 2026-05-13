using MediatR;
using NetMetric.CRM.TicketManagement.Contracts.DTOs;

namespace NetMetric.CRM.TicketManagement.Application.Commands.Tickets;

public sealed record SoftDeleteTicketCommand(Guid TicketId) : IRequest;
