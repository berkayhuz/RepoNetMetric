using MediatR;

namespace NetMetric.CRM.IntegrationHub.Application.Commands.UpsertIntegrationConnection;

public sealed record UpsertIntegrationConnectionCommand(
    Guid TenantId,
    string ProviderKey,
    string DisplayName,
    string Category,
    string SettingsJson,
    bool IsEnabled) : IRequest<Guid>;
