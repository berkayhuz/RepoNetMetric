using MediatR;
using NetMetric.CRM.CustomerManagement.Application.Abstractions.Services;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Duplicates.Commands.MergeContactRecords;

public sealed class MergeContactRecordsCommandHandler(ICustomerManagementMergeService mergeService) : IRequestHandler<MergeContactRecordsCommand>
{
    private readonly ICustomerManagementMergeService _mergeService = mergeService;

    public async Task Handle(MergeContactRecordsCommand request, CancellationToken cancellationToken)
    {
        await _mergeService.MergeContactsAsync(request.TargetContactId, request.SourceContactId, cancellationToken);
    }
}
