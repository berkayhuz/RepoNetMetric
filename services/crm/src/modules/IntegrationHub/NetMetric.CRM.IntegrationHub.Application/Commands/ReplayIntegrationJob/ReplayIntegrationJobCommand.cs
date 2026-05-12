using MediatR;
using NetMetric.Idempotency;

namespace NetMetric.CRM.IntegrationHub.Application.Commands.ReplayIntegrationJob;

public sealed record ReplayIntegrationJobCommand(Guid TenantId, Guid JobId, string? IdempotencyKey = null) : IRequest<Guid>, IIdempotentCommand;
