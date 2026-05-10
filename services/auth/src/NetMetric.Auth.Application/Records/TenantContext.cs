namespace NetMetric.Auth.Application.Records;

public sealed record TenantContext(Guid? TenantId, string? TenantSlug, string Source, bool IsTrusted);
