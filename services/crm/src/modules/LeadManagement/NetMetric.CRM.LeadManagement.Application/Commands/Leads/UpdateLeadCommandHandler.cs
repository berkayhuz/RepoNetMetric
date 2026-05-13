using MediatR;
using NetMetric.CRM.LeadManagement.Application.Abstractions.Services;
using NetMetric.CRM.LeadManagement.Contracts.DTOs;

namespace NetMetric.CRM.LeadManagement.Application.Commands.Leads;

public sealed class UpdateLeadCommandHandler(ILeadAdministrationService administrationService)
    : IRequestHandler<UpdateLeadCommand, LeadDetailDto>
{
    public Task<LeadDetailDto> Handle(UpdateLeadCommand request, CancellationToken cancellationToken)
        => administrationService.UpdateAsync(request, cancellationToken);
}
