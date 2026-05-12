using MediatR;

namespace NetMetric.CRM.TenantManagement.Application.Commands.ProvisionTenant;

public sealed record ProvisionTenantCommand(Guid TenantId, string Name, string AdminEmail) : IRequest<Guid>;
