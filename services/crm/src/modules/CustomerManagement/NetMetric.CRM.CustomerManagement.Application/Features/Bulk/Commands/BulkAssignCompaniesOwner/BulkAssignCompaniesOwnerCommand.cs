using NetMetric.CRM.CustomerManagement.Application.DTOs.Bulk;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Bulk.Commands.BulkAssignCompaniesOwner;

public sealed record BulkAssignCompaniesOwnerCommand(
    IReadOnlyCollection<Guid> CompanyIds,
    Guid? OwnerUserId) : IRequest<BulkOperationResultDto>;
