using NetMetric.CRM.TicketManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.TicketManagement.Application.Queries.Tickets;

public sealed record GetTicketByIdQuery(Guid TicketId) : IRequest<TicketDetailDto?>;
