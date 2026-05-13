using MediatR;
using NetMetric.CRM.CustomerManagement.Application.DTOs.Bulk;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Bulk.Commands.BulkSoftDeleteCustomers;

public sealed record BulkSoftDeleteCustomersCommand(
    IReadOnlyCollection<Guid> CustomerIds) : IRequest<BulkOperationResultDto>;
