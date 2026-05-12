using NetMetric.CRM.LeadManagement.Application.Abstractions.Services;
using MediatR;

namespace NetMetric.CRM.LeadManagement.Application.Features.Bulk.Commands.BulkSoftDeleteLeads;

public sealed class BulkSoftDeleteLeadsCommandHandler(ILeadAdministrationService administrationService)
    : IRequestHandler<BulkSoftDeleteLeadsCommand, int>
{
    public Task<int> Handle(BulkSoftDeleteLeadsCommand request, CancellationToken cancellationToken)
        => administrationService.BulkSoftDeleteAsync(request, cancellationToken);
}
