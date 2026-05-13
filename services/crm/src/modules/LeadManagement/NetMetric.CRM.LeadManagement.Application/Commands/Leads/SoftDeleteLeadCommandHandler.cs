using MediatR;
using NetMetric.CRM.LeadManagement.Application.Abstractions.Services;

namespace NetMetric.CRM.LeadManagement.Application.Commands.Leads;

public sealed class SoftDeleteLeadCommandHandler(ILeadAdministrationService administrationService)
    : IRequestHandler<SoftDeleteLeadCommand, Unit>
{
    public async Task<Unit> Handle(SoftDeleteLeadCommand request, CancellationToken cancellationToken)
    {
        await administrationService.SoftDeleteAsync(request, cancellationToken);
        return Unit.Value;
    }
}
