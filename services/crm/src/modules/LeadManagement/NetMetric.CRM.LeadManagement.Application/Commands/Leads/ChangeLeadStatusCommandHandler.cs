using NetMetric.CRM.LeadManagement.Application.Abstractions.Services;
using MediatR;

namespace NetMetric.CRM.LeadManagement.Application.Commands.Leads;

public sealed class ChangeLeadStatusCommandHandler(ILeadAdministrationService administrationService)
    : IRequestHandler<ChangeLeadStatusCommand, Unit>
{
    public async Task<Unit> Handle(ChangeLeadStatusCommand request, CancellationToken cancellationToken)
    {
        await administrationService.ChangeStatusAsync(request, cancellationToken);
        return Unit.Value;
    }
}
