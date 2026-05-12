using MediatR;

namespace NetMetric.CRM.TenantManagement.Application.Commands.UpdateTenantBranding;

public sealed record UpdateTenantBrandingCommand(
    Guid TenantId,
    string? PrimaryDomain,
    string Locale,
    string TimeZone,
    string? BrandPrimaryColor,
    string? LogoUrl) : IRequest;
