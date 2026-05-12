using MediatR;

namespace NetMetric.CRM.IntegrationHub.Application.Commands.RegisterWebhook;

public sealed record RegisterWebhookCommand(
    Guid TenantId,
    string Name,
    string EventKey,
    string TargetUrl,
    string SecretKey,
    int TimeoutSeconds,
    int MaxAttempts) : IRequest<Guid>;
