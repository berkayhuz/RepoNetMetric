namespace NetMetric.CRM.LeadManagement.Application.Abstractions.Services;

public interface ILeadRoutingService
{
    Task RouteLeadAsync(Guid leadId, CancellationToken cancellationToken);
}
