using MediatR;
using NetMetric.CRM.TicketSlaManagement.Contracts.DTOs;

namespace NetMetric.CRM.TicketSlaManagement.Application.Queries.TicketSla;

public sealed record GetTicketEscalationRunsQuery(Guid TicketId) : IRequest<IReadOnlyList<TicketEscalationRunDto>>;
