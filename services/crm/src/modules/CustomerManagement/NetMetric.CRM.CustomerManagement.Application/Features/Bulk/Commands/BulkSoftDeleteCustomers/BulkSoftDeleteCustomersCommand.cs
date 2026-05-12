using NetMetric.CRM.CustomerManagement.Application.DTOs.Bulk;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Bulk.Commands.BulkSoftDeleteCustomers;

public sealed record BulkSoftDeleteCustomersCommand(
    IReadOnlyCollection<Guid> CustomerIds) : IRequest<BulkOperationResultDto>;
