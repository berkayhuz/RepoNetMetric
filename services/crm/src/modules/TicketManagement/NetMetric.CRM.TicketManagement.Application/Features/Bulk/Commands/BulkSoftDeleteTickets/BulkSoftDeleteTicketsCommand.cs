using MediatR;
using NetMetric.CRM.TicketManagement.Contracts.DTOs;

namespace NetMetric.CRM.TicketManagement.Application.Features.Bulk.Commands.BulkSoftDeleteTickets;

public sealed record BulkSoftDeleteTicketsCommand(IReadOnlyCollection<Guid> TicketIds) : IRequest<int>;
