using MediatR;

namespace NetMetric.CRM.TenantManagement.Application.Queries.GetTenantSummary;

public sealed record GetTenantSummaryQuery(Guid TenantId) : IRequest<TenantSummaryDto>;

public sealed record TenantSummaryDto(
    Guid TenantId,
    string Name,
    string? PrimaryDomain,
    string Locale,
    string TimeZone,
    bool IsProvisioned,
    IReadOnlyCollection<TenantFlagDto> FeatureFlags,
    IReadOnlyCollection<TenantModuleDto> Modules);

public sealed record TenantFlagDto(string Key, bool IsEnabled, DateTime? EffectiveFromUtc);
public sealed record TenantModuleDto(string ModuleKey, bool IsEnabled);
