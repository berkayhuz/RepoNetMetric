using MediatR;

namespace NetMetric.CRM.LeadManagement.Application.Features.Bulk.Commands.BulkSoftDeleteLeads;

public sealed record BulkSoftDeleteLeadsCommand(IReadOnlyCollection<Guid> LeadIds) : IRequest<int>;
