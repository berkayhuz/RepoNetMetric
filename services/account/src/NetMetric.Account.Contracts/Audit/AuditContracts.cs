namespace NetMetric.Account.Contracts.Audit;

public sealed record AccountAuditEntryResponse(
    Guid Id,
    Guid TenantId,
    Guid UserId,
    string EventType,
    string Severity,
    DateTimeOffset OccurredAt,
    string? CorrelationId,
    string? MetadataJson);

public sealed record AccountAuditEntriesResponse(
    IReadOnlyCollection<AccountAuditEntryResponse> Items,
    int Count);
