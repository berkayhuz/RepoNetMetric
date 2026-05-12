using MediatR;

namespace NetMetric.CRM.WorkflowAutomation.Application.Features.Automation.Commands.DeactivateAutomationRule;

public sealed record DeactivateAutomationRuleCommand(Guid TenantId, Guid RuleId) : IRequest;
