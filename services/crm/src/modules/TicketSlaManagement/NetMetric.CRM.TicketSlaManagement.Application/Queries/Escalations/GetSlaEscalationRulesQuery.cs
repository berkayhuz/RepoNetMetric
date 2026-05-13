using MediatR;
using NetMetric.CRM.TicketSlaManagement.Contracts.DTOs;

namespace NetMetric.CRM.TicketSlaManagement.Application.Queries.Escalations;

public sealed record GetSlaEscalationRulesQuery(Guid SlaPolicyId) : IRequest<IReadOnlyList<SlaEscalationRuleDto>>;
