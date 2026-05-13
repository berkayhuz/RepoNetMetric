using MediatR;
using NetMetric.CRM.CustomerManagement.Application.DTOs.Bulk;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Bulk.Commands.BulkSoftDeleteContacts;

public sealed record BulkSoftDeleteContactsCommand(
    IReadOnlyCollection<Guid> ContactIds) : IRequest<BulkOperationResultDto>;
