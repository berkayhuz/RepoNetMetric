using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Duplicates.Commands.MergeContactRecords;

public sealed record MergeContactRecordsCommand(Guid TargetContactId, Guid SourceContactId) : IRequest;
