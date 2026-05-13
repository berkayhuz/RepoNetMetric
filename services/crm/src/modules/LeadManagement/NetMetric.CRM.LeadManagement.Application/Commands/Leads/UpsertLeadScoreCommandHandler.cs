using MediatR;
using NetMetric.CRM.LeadManagement.Application.Abstractions.Services;
using NetMetric.CRM.LeadManagement.Contracts.DTOs;

namespace NetMetric.CRM.LeadManagement.Application.Commands.Leads;

public sealed class UpsertLeadScoreCommandHandler(ILeadAdministrationService administrationService)
    : IRequestHandler<UpsertLeadScoreCommand, LeadScoreDto>
{
    public Task<LeadScoreDto> Handle(UpsertLeadScoreCommand request, CancellationToken cancellationToken)
        => administrationService.UpsertScoreAsync(request, cancellationToken);
}
