using MediatR;
using NetMetric.CRM.WorkflowAutomation.Application.Abstractions.Persistence;
using NetMetric.CRM.WorkflowAutomation.Domain.Entities.ApprovalWorkflows;

namespace NetMetric.CRM.WorkflowAutomation.Application.Features.Approvals.Commands.CreateApprovalWorkflow;

public sealed class CreateApprovalWorkflowCommandHandler(IWorkflowAutomationDbContext dbContext) : IRequestHandler<CreateApprovalWorkflowCommand, Guid>
{
    public async Task<Guid> Handle(CreateApprovalWorkflowCommand request, CancellationToken cancellationToken)
    {
        var entity = ApprovalWorkflow.Create(
            request.Name,
            request.EntityType,
            request.RelatedEntityId,
            routingPolicyJson: request.RoutingPolicyJson,
            escalationPolicyJson: request.EscalationPolicyJson,
            slaPolicyJson: request.SlaPolicyJson);

        await dbContext.ApprovalWorkflows.AddAsync(entity, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
        return entity.Id;
    }
}
