using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Duplicates.Commands.MergeCompanyRecords;

public sealed record MergeCompanyRecordsCommand(Guid TargetCompanyId, Guid SourceCompanyId) : IRequest;
