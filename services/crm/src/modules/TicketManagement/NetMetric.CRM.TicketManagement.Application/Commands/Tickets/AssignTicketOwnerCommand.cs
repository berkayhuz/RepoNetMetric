using MediatR;
using NetMetric.CRM.TicketManagement.Contracts.DTOs;

namespace NetMetric.CRM.TicketManagement.Application.Commands.Tickets;

public sealed record AssignTicketOwnerCommand(Guid TicketId, Guid? OwnerUserId) : IRequest;
