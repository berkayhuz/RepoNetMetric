using MediatR;

namespace NetMetric.CRM.WorkflowAutomation.Application.Features.Automation.Commands.RetryRuleExecution;

public sealed record RetryRuleExecutionCommand(Guid TenantId, Guid ExecutionLogId) : IRequest<Guid>;
