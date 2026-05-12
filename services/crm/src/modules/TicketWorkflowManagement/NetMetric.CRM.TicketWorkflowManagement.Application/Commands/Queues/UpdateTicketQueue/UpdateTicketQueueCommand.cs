using MediatR;
using NetMetric.CRM.TicketWorkflowManagement.Domain.Enums;

namespace NetMetric.CRM.TicketWorkflowManagement.Application.Commands.Queues.UpdateTicketQueue;

public sealed record UpdateTicketQueueCommand(
    Guid QueueId,
    string Name,
    string? Description,
    TicketQueueAssignmentStrategy AssignmentStrategy,
    bool IsDefault) : IRequest;
