using MediatR;
using Microsoft.EntityFrameworkCore;
using NetMetric.CRM.WorkflowAutomation.Application.Abstractions.Persistence;
using NetMetric.CRM.WorkflowAutomation.Application.Security;
using NetMetric.CurrentUser;
using NetMetric.Exceptions;
using NetMetric.Tenancy;

namespace NetMetric.CRM.WorkflowAutomation.Application.Features.Automation.Commands.ActivateAutomationRule;

public sealed class ActivateAutomationRuleCommandHandler(
    IWorkflowAutomationDbContext dbContext,
    ITenantContext tenantContext,
    ICurrentUserService currentUserService) : IRequestHandler<ActivateAutomationRuleCommand>
{
    public async Task Handle(ActivateAutomationRuleCommand request, CancellationToken cancellationToken)
    {
        var tenantId = TenantRequestGuard.Resolve(tenantContext, request.TenantId);
        var rule = await dbContext.AutomationRules.FirstOrDefaultAsync(x => x.TenantId == tenantId && x.Id == request.RuleId, cancellationToken)
            ?? throw new NotFoundAppException("Workflow automation rule not found.");

        rule.Activate(DateTime.UtcNow, currentUserService.UserName);
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
