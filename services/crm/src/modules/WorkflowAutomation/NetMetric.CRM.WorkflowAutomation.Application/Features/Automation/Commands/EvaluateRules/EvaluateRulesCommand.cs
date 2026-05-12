using MediatR;
using NetMetric.CRM.WorkflowAutomation.Contracts.DTOs;

namespace NetMetric.CRM.WorkflowAutomation.Application.Features.Automation.Commands.EvaluateRules;

public sealed record EvaluateRulesCommand(
    Guid TenantId,
    string TriggerType,
    string EntityType,
    Guid? EntityId,
    string PayloadJson,
    string? IdempotencyKey = null,
    string? CorrelationId = null,
    int LoopDepth = 0) : IRequest<WorkflowRuleExecutionResultDto>;
