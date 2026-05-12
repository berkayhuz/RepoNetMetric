using NetMetric.CRM.CustomerManagement.Application.DTOs.Bulk;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Bulk.Commands.BulkAssignContactsOwner;

public sealed record BulkAssignContactsOwnerCommand(
    IReadOnlyCollection<Guid> ContactIds,
    Guid? OwnerUserId) : IRequest<BulkOperationResultDto>;
