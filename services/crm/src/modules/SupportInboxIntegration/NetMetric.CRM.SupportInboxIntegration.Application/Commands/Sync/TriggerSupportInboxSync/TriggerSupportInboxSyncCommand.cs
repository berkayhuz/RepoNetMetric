using MediatR;

namespace NetMetric.CRM.SupportInboxIntegration.Application.Commands.Sync.TriggerSupportInboxSync;

public sealed record TriggerSupportInboxSyncCommand(Guid ConnectionId, bool DryRun) : IRequest;
