using MediatR;
using NetMetric.Idempotency;

namespace NetMetric.CRM.IntegrationHub.Application.Commands.ScheduleIntegrationJob;

public sealed record ScheduleIntegrationJobCommand(
    Guid TenantId,
    string JobType,
    string Direction,
    string PayloadJson,
    DateTime ScheduledAtUtc,
    string? ProviderKey = null,
    string? IdempotencyKey = null,
    int? MaxAttempts = null) : IRequest<Guid>, IIdempotentCommand;
