using NetMetric.CRM.CustomerManagement.Application.Abstractions.Services;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Duplicates.Commands.MergeCustomerRecords;

public sealed class MergeCustomerRecordsCommandHandler(ICustomerManagementMergeService mergeService) : IRequestHandler<MergeCustomerRecordsCommand>
{
    private readonly ICustomerManagementMergeService _mergeService = mergeService;

    public async Task Handle(MergeCustomerRecordsCommand request, CancellationToken cancellationToken)
    {
        await _mergeService.MergeCustomersAsync(request.TargetCustomerId, request.SourceCustomerId, cancellationToken);
    }
}
