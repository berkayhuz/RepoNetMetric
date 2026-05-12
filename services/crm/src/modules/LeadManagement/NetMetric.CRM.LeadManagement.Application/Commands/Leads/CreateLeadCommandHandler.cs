using NetMetric.CRM.LeadManagement.Application.Abstractions.Services;
using NetMetric.CRM.LeadManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.LeadManagement.Application.Commands.Leads;

public sealed class CreateLeadCommandHandler(ILeadAdministrationService administrationService)
    : IRequestHandler<CreateLeadCommand, LeadDetailDto>
{
    public Task<LeadDetailDto> Handle(CreateLeadCommand request, CancellationToken cancellationToken)
        => administrationService.CreateAsync(request, cancellationToken);
}
