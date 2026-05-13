using MediatR;
using NetMetric.CRM.IntegrationHub.Application.DTOs;

namespace NetMetric.CRM.IntegrationHub.Application.Commands.ValidateWebhookDelivery;

public sealed record ValidateWebhookDeliveryCommand(
    Guid TenantId,
    string ProviderKey,
    string EventId,
    string Timestamp,
    string Signature,
    string PayloadJson) : IRequest<WebhookValidationResultDto>;
