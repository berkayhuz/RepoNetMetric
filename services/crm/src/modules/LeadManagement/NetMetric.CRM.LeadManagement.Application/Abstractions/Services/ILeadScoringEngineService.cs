namespace NetMetric.CRM.LeadManagement.Application.Abstractions.Services;

public interface ILeadScoringEngineService
{
    Task EvaluateAndScoreAsync(Guid leadId, CancellationToken cancellationToken);
}
