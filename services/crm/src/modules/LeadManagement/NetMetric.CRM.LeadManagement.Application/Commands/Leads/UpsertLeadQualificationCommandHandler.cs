using MediatR;
using NetMetric.CRM.LeadManagement.Application.Abstractions.Services;

namespace NetMetric.CRM.LeadManagement.Application.Commands.Leads;

public sealed class UpsertLeadQualificationCommandHandler(ILeadAdministrationService administrationService)
    : IRequestHandler<UpsertLeadQualificationCommand>
{
    public async Task Handle(UpsertLeadQualificationCommand request, CancellationToken cancellationToken)
    {
        await administrationService.UpsertQualificationAsync(request, cancellationToken);
    }
}
