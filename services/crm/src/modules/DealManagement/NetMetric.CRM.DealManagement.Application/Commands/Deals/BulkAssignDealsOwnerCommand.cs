using MediatR;

namespace NetMetric.CRM.DealManagement.Application.Commands.Deals;

public sealed record BulkAssignDealsOwnerCommand(IReadOnlyList<Guid> DealIds, Guid? OwnerUserId) : IRequest<int>;
