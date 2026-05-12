using NetMetric.CRM.TicketSlaManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.TicketSlaManagement.Application.Queries.SlaPolicies;

public sealed record GetSlaPoliciesQuery() : IRequest<IReadOnlyList<SlaPolicyListItemDto>>;
