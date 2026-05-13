using MediatR;
using NetMetric.CRM.TicketSlaManagement.Application.Abstractions.Services;

namespace NetMetric.CRM.TicketSlaManagement.Application.Commands.SlaPolicies;

public sealed class UpdateSlaPolicyCommandHandler(ITicketSlaAdministrationService service) : IRequestHandler<UpdateSlaPolicyCommand>
{
    public Task Handle(UpdateSlaPolicyCommand request, CancellationToken cancellationToken) =>
        service.UpdatePolicyAsync(
            request.Id,
            request.Name,
            request.TicketCategoryId,
            request.Priority,
            request.FirstResponseTargetMinutes,
            request.ResolutionTargetMinutes,
            request.IsDefault,
            cancellationToken);
}
