using MediatR;

namespace NetMetric.CRM.TicketWorkflowManagement.Application.Commands.Assignments.AssignTicketToQueue;

public sealed record AssignTicketToQueueCommand(Guid TicketId, Guid? PreviousQueueId, Guid NewQueueId, string? Reason) : IRequest;
