using MediatR;
using NetMetric.CRM.LeadManagement.Application.Abstractions.Services;

namespace NetMetric.CRM.LeadManagement.Application.Features.Bulk.Commands.BulkAssignLeadsOwner;

public sealed class BulkAssignLeadsOwnerCommandHandler(ILeadAdministrationService administrationService)
    : IRequestHandler<BulkAssignLeadsOwnerCommand, int>
{
    public Task<int> Handle(BulkAssignLeadsOwnerCommand request, CancellationToken cancellationToken)
        => administrationService.BulkAssignOwnerAsync(request, cancellationToken);
}
