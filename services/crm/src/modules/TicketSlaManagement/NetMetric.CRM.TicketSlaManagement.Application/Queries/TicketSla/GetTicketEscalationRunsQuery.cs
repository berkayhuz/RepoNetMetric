using NetMetric.CRM.TicketSlaManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.TicketSlaManagement.Application.Queries.TicketSla;

public sealed record GetTicketEscalationRunsQuery(Guid TicketId) : IRequest<IReadOnlyList<TicketEscalationRunDto>>;
