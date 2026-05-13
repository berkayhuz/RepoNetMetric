using MediatR;

namespace NetMetric.CRM.LeadManagement.Application.Features.Bulk.Commands.BulkAssignLeadsOwner;

public sealed record BulkAssignLeadsOwnerCommand(IReadOnlyCollection<Guid> LeadIds, Guid? OwnerUserId) : IRequest<int>;
