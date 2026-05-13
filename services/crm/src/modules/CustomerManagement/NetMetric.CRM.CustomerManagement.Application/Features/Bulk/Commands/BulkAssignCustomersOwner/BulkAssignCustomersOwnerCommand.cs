using MediatR;
using NetMetric.CRM.CustomerManagement.Application.DTOs.Bulk;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Bulk.Commands.BulkAssignCustomersOwner;

public sealed record BulkAssignCustomersOwnerCommand(
    IReadOnlyCollection<Guid> CustomerIds,
    Guid? OwnerUserId) : IRequest<BulkOperationResultDto>;
