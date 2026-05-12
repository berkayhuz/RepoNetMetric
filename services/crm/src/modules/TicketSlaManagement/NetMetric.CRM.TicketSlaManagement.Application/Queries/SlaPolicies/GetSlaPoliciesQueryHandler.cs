using NetMetric.CRM.TicketSlaManagement.Application.Abstractions.Persistence;
using NetMetric.CRM.TicketSlaManagement.Application.Common;
using NetMetric.CRM.TicketSlaManagement.Contracts.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace NetMetric.CRM.TicketSlaManagement.Application.Queries.SlaPolicies;

public sealed class GetSlaPoliciesQueryHandler(ITicketSlaManagementDbContext dbContext) : IRequestHandler<GetSlaPoliciesQuery, IReadOnlyList<SlaPolicyListItemDto>>
{
    public async Task<IReadOnlyList<SlaPolicyListItemDto>> Handle(GetSlaPoliciesQuery request, CancellationToken cancellationToken) =>
        await dbContext.SlaPolicies
            .AsNoTracking()
            .Where(x => !x.IsDeleted)
            .OrderBy(x => x.Name)
            .Select(x => x.ToDto())
            .ToListAsync(cancellationToken);
}
