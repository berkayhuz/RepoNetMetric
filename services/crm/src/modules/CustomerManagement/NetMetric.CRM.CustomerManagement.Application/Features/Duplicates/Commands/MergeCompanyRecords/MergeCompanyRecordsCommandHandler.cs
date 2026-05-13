using MediatR;
using NetMetric.CRM.CustomerManagement.Application.Abstractions.Services;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Duplicates.Commands.MergeCompanyRecords;

public sealed class MergeCompanyRecordsCommandHandler(ICustomerManagementMergeService mergeService) : IRequestHandler<MergeCompanyRecordsCommand>
{
    private readonly ICustomerManagementMergeService _mergeService = mergeService;

    public async Task Handle(MergeCompanyRecordsCommand request, CancellationToken cancellationToken)
    {
        await _mergeService.MergeCompaniesAsync(request.TargetCompanyId, request.SourceCompanyId, cancellationToken);
    }
}
