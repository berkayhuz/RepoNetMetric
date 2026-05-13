using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Duplicates.Commands.MergeCustomerRecords;

public sealed record MergeCustomerRecordsCommand(Guid TargetCustomerId, Guid SourceCustomerId) : IRequest;
