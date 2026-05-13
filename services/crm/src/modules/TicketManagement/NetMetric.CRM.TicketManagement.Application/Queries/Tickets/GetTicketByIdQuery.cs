using MediatR;
using NetMetric.CRM.TicketManagement.Contracts.DTOs;

namespace NetMetric.CRM.TicketManagement.Application.Queries.Tickets;

public sealed record GetTicketByIdQuery(Guid TicketId) : IRequest<TicketDetailDto?>;
