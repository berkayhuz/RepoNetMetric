using NetMetric.CRM.TenantManagement.Application.Abstractions.Persistence;
using NetMetric.CRM.TenantManagement.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace NetMetric.CRM.TenantManagement.Application.Commands.ToggleModule;

public sealed class ToggleModuleCommandHandler(ITenantManagementDbContext dbContext)
    : IRequestHandler<ToggleModuleCommand>
{
    public async Task Handle(ToggleModuleCommand request, CancellationToken cancellationToken)
    {
        var entity = await dbContext.TenantModuleToggles
            .FirstOrDefaultAsync(x => x.TenantId == request.TenantId && x.ModuleKey == request.ModuleKey, cancellationToken);

        if (entity is null)
        {
            entity = new TenantModuleToggle(request.TenantId, request.ModuleKey, request.IsEnabled);
            await dbContext.TenantModuleToggles.AddAsync(entity, cancellationToken);
        }
        else
        {
            entity.SetEnabled(request.IsEnabled);
        }

        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
