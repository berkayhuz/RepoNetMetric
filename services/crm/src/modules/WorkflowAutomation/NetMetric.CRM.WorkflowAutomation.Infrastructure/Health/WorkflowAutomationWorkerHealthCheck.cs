using Microsoft.Extensions.Diagnostics.HealthChecks;
using NetMetric.CRM.WorkflowAutomation.Application.Abstractions.Rules;

namespace NetMetric.CRM.WorkflowAutomation.Infrastructure.Health;

public sealed class WorkflowAutomationWorkerHealthCheck(IWorkflowExecutionProcessingState state) : IHealthCheck
{
    public Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        return Task.FromResult(state.IsEnabled
            ? HealthCheckResult.Healthy("Workflow automation worker is enabled.")
            : HealthCheckResult.Degraded("Workflow automation worker is disabled by configuration."));
    }
}
