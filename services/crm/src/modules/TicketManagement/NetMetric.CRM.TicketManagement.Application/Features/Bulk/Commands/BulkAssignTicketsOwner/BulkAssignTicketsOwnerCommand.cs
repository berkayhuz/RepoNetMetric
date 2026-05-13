using MediatR;
using NetMetric.CRM.TicketManagement.Contracts.DTOs;

namespace NetMetric.CRM.TicketManagement.Application.Features.Bulk.Commands.BulkAssignTicketsOwner;

public sealed record BulkAssignTicketsOwnerCommand(IReadOnlyCollection<Guid> TicketIds, Guid? OwnerUserId) : IRequest<int>;
