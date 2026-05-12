using MediatR;
using NetMetric.CRM.TicketWorkflowManagement.Application.DTOs;

namespace NetMetric.CRM.TicketWorkflowManagement.Application.Queries.GetTicketAssignmentHistory;

public sealed record GetTicketAssignmentHistoryQuery(Guid TicketId) : IRequest<IReadOnlyList<TicketAssignmentHistoryDto>>;
