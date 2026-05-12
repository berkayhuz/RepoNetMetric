using MediatR;
using NetMetric.CRM.TicketWorkflowManagement.Application.DTOs;

namespace NetMetric.CRM.TicketWorkflowManagement.Application.Queries.GetTicketStatusHistory;

public sealed record GetTicketStatusHistoryQuery(Guid TicketId) : IRequest<IReadOnlyList<TicketStatusHistoryDto>>;
