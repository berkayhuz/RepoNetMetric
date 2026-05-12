using MediatR;
using NetMetric.CRM.ServiceManagement;
using NetMetric.CRM.TicketSlaManagement.Application.Abstractions.Services;

namespace NetMetric.CRM.TicketSlaManagement.Application.Commands.SlaPolicies;

public sealed class CreateSlaPolicyCommandHandler(ITicketSlaAdministrationService service) : IRequestHandler<CreateSlaPolicyCommand, Guid>
{
    public Task<Guid> Handle(CreateSlaPolicyCommand request, CancellationToken cancellationToken)
    {
        var entity = new SlaPolicy(
            request.Name,
            request.TicketCategoryId,
            request.Priority,
            request.FirstResponseTargetMinutes,
            request.ResolutionTargetMinutes);

        if (request.IsDefault)
            entity.MarkAsDefault();

        return service.CreatePolicyAsync(entity, cancellationToken);
    }
}
