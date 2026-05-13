using MediatR;

namespace NetMetric.CRM.TicketWorkflowManagement.Application.Commands.StatusHistory.RecordTicketStatusChange;

public sealed record RecordTicketStatusChangeCommand(Guid TicketId, string PreviousStatus, string NewStatus, string? Note) : IRequest;
