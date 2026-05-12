using NetMetric.CRM.Sales;

namespace NetMetric.CRM.PipelineManagement.Application.Abstractions.Services;

public interface IPipelineValidationService
{
    Task<(bool IsValid, List<string> Errors)> ValidateStageTransitionAsync(
        Opportunity opportunity,
        Guid targetStageId,
        CancellationToken cancellationToken = default);
}
