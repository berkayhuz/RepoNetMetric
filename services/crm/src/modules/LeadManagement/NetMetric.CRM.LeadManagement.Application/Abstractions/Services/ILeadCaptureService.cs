using NetMetric.CRM.LeadManagement.Application.Commands.Leads;

namespace NetMetric.CRM.LeadManagement.Application.Abstractions.Services;

public interface ILeadCaptureService
{
    Task<Guid> CaptureAsync(CaptureLeadCommand request, CancellationToken cancellationToken);
}
