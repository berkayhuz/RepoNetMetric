using MediatR;
using NetMetric.CRM.LeadManagement.Application.Abstractions.Services;

namespace NetMetric.CRM.LeadManagement.Application.Commands.Leads;

public sealed class ScheduleNextContactCommandHandler(ILeadAdministrationService administrationService)
    : IRequestHandler<ScheduleNextContactCommand, Unit>
{
    public async Task<Unit> Handle(ScheduleNextContactCommand request, CancellationToken cancellationToken)
    {
        await administrationService.ScheduleNextContactAsync(request, cancellationToken);
        return Unit.Value;
    }
}
