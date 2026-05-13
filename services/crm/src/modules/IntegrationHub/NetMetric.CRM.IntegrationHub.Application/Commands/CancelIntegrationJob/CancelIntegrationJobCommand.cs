using MediatR;

namespace NetMetric.CRM.IntegrationHub.Application.Commands.CancelIntegrationJob;

public sealed record CancelIntegrationJobCommand(Guid TenantId, Guid JobId, string? Reason) : IRequest;
