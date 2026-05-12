using MediatR;
using NetMetric.CRM.WorkflowAutomation.Application.Abstractions.Rules;
using NetMetric.CRM.WorkflowAutomation.Application.Security;
using NetMetric.CRM.WorkflowAutomation.Contracts.DTOs;
using NetMetric.Tenancy;

namespace NetMetric.CRM.WorkflowAutomation.Application.Features.Automation.Commands.EvaluateRules;

public sealed class EvaluateRulesCommandHandler(
    IWorkflowRuleEngine ruleEngine,
    ITenantContext tenantContext) : IRequestHandler<EvaluateRulesCommand, WorkflowRuleExecutionResultDto>
{
    public Task<WorkflowRuleExecutionResultDto> Handle(EvaluateRulesCommand request, CancellationToken cancellationToken)
    {
        var tenantId = TenantRequestGuard.Resolve(tenantContext, request.TenantId);
        return ruleEngine.ExecuteAsync(
            new WorkflowRuleExecutionRequest(
                tenantId,
                request.TriggerType,
                request.EntityType,
                request.EntityId,
                request.PayloadJson,
                request.IdempotencyKey,
                request.CorrelationId,
                request.LoopDepth),
            cancellationToken);
    }
}
