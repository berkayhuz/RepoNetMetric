namespace NetMetric.Account.Application.Abstractions.Outbox;

public interface IAccountOutboxWriter
{
    Task EnqueueAsync<TPayload>(
        Guid tenantId,
        string type,
        TPayload payload,
        string? correlationId,
        CancellationToken cancellationToken = default);
}
