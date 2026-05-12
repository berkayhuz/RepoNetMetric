using MediatR;

namespace NetMetric.CRM.TicketWorkflowManagement.Application.Commands.Queues.SoftDeleteTicketQueue;

public sealed record SoftDeleteTicketQueueCommand(Guid QueueId) : IRequest;
