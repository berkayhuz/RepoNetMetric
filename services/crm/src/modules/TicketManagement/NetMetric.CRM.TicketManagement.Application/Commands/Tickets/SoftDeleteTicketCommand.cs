using NetMetric.CRM.TicketManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.TicketManagement.Application.Commands.Tickets;

public sealed record SoftDeleteTicketCommand(Guid TicketId) : IRequest;
