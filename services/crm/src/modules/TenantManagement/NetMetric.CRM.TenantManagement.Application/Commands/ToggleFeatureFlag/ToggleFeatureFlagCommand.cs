using MediatR;

namespace NetMetric.CRM.TenantManagement.Application.Commands.ToggleFeatureFlag;

public sealed record ToggleFeatureFlagCommand(Guid TenantId, string Key, bool IsEnabled, DateTime? EffectiveFromUtc) : IRequest;
