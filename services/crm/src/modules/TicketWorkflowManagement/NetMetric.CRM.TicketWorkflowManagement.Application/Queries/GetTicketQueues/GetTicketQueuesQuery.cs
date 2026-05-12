using MediatR;
using NetMetric.CRM.TicketWorkflowManagement.Application.DTOs;

namespace NetMetric.CRM.TicketWorkflowManagement.Application.Queries.GetTicketQueues;

public sealed record GetTicketQueuesQuery() : IRequest<IReadOnlyList<TicketQueueDto>>;
