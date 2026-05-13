using MediatR;

namespace NetMetric.CRM.WorkflowAutomation.Application.Features.Automation.Commands.ActivateAutomationRule;

public sealed record ActivateAutomationRuleCommand(Guid TenantId, Guid RuleId) : IRequest;
