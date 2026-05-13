namespace NetMetric.Account.Contracts.Consents;

public sealed record ConsentHistoryItemResponse(
    Guid Id,
    string ConsentType,
    string Version,
    string Status,
    DateTimeOffset DecidedAt);

public sealed record ConsentsResponse(IReadOnlyCollection<ConsentHistoryItemResponse> Items);

public sealed record AcceptConsentRequest(string Version);
