using MediatR;

namespace NetMetric.CRM.WorkflowAutomation.Application.Features.Approvals.Commands.CreateApprovalWorkflow;

public sealed record CreateApprovalWorkflowCommand(
    string Name,
    string EntityType,
    Guid? RelatedEntityId = null,
    string? RoutingPolicyJson = null,
    string? EscalationPolicyJson = null,
    string? SlaPolicyJson = null) : IRequest<Guid>;
