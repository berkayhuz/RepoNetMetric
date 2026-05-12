using NetMetric.CRM.TicketSlaManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.TicketSlaManagement.Application.Queries.TicketSla;

public sealed record GetTicketSlaWorkspaceQuery(Guid TicketId) : IRequest<TicketSlaWorkspaceDto?>;
