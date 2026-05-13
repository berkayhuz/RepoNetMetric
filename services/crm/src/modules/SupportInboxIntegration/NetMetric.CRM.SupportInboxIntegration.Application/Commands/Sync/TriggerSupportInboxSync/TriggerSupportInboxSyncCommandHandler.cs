using MediatR;
using NetMetric.CRM.SupportInboxIntegration.Application.Abstractions.Services;

namespace NetMetric.CRM.SupportInboxIntegration.Application.Commands.Sync.TriggerSupportInboxSync;

public sealed class TriggerSupportInboxSyncCommandHandler(ISupportInboxSynchronizationService synchronizationService) : IRequestHandler<TriggerSupportInboxSyncCommand>
{
    public async Task Handle(TriggerSupportInboxSyncCommand request, CancellationToken cancellationToken)
        => await synchronizationService.RunAsync(request.ConnectionId, request.DryRun, cancellationToken);
}
