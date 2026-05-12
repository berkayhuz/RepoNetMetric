using NetMetric.CRM.CustomerManagement.Application.DTOs.Bulk;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Bulk.Commands.BulkSoftDeleteCompanies;

public sealed record BulkSoftDeleteCompaniesCommand(
    IReadOnlyCollection<Guid> CompanyIds) : IRequest<BulkOperationResultDto>;
