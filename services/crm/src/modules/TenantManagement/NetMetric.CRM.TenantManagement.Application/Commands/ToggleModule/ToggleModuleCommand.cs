using MediatR;

namespace NetMetric.CRM.TenantManagement.Application.Commands.ToggleModule;

public sealed record ToggleModuleCommand(Guid TenantId, string ModuleKey, bool IsEnabled) : IRequest;
