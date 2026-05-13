using MediatR;
using NetMetric.CRM.LeadManagement.Application.Abstractions.Services;

namespace NetMetric.CRM.LeadManagement.Application.Commands.Leads;

public sealed class AssignLeadOwnerCommandHandler(ILeadAdministrationService administrationService)
    : IRequestHandler<AssignLeadOwnerCommand, Unit>
{
    public async Task<Unit> Handle(AssignLeadOwnerCommand request, CancellationToken cancellationToken)
    {
        await administrationService.AssignOwnerAsync(request, cancellationToken);
        return Unit.Value;
    }
}
