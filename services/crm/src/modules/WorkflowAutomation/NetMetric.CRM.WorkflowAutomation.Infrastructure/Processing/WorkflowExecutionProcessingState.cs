using Microsoft.Extensions.Options;
using NetMetric.CRM.WorkflowAutomation.Application.Abstractions.Rules;

namespace NetMetric.CRM.WorkflowAutomation.Infrastructure.Processing;

public sealed class WorkflowExecutionProcessingState(IOptions<WorkflowAutomationOptions> options) : IWorkflowExecutionProcessingState
{
    public bool IsEnabled => options.Value.WorkerEnabled;
}
