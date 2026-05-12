using MediatR;
using NetMetric.CRM.TicketWorkflowManagement.Domain.Enums;

namespace NetMetric.CRM.TicketWorkflowManagement.Application.Commands.Queues.CreateTicketQueue;

public sealed record CreateTicketQueueCommand(
    string Code,
    string Name,
    string? Description,
    TicketQueueAssignmentStrategy AssignmentStrategy,
    bool IsDefault) : IRequest<Guid>;
