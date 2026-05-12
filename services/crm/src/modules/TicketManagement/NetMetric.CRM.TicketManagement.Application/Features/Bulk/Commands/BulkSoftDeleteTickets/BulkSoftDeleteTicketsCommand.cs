using NetMetric.CRM.TicketManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.TicketManagement.Application.Features.Bulk.Commands.BulkSoftDeleteTickets;

public sealed record BulkSoftDeleteTicketsCommand(IReadOnlyCollection<Guid> TicketIds) : IRequest<int>;
