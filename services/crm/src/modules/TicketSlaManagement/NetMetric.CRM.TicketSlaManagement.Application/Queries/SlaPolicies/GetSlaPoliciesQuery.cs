using MediatR;
using NetMetric.CRM.TicketSlaManagement.Contracts.DTOs;

namespace NetMetric.CRM.TicketSlaManagement.Application.Queries.SlaPolicies;

public sealed record GetSlaPoliciesQuery() : IRequest<IReadOnlyList<SlaPolicyListItemDto>>;
