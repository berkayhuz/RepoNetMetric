using MediatR;

namespace NetMetric.CRM.TicketWorkflowManagement.Application.Commands.Assignments.AssignTicketOwner;

public sealed record AssignTicketOwnerCommand(Guid TicketId, Guid? PreviousOwnerUserId, Guid NewOwnerUserId, Guid? QueueId, string? Reason) : IRequest;
