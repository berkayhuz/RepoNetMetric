using NetMetric.CRM.TicketSlaManagement.Application.Abstractions.Persistence;
using NetMetric.CRM.TicketSlaManagement.Application.Common;
using NetMetric.CRM.TicketSlaManagement.Contracts.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace NetMetric.CRM.TicketSlaManagement.Application.Queries.TicketSla;

public sealed class GetTicketEscalationRunsQueryHandler(ITicketSlaManagementDbContext dbContext) : IRequestHandler<GetTicketEscalationRunsQuery, IReadOnlyList<TicketEscalationRunDto>>
{
    public async Task<IReadOnlyList<TicketEscalationRunDto>> Handle(GetTicketEscalationRunsQuery request, CancellationToken cancellationToken) =>
        await dbContext.TicketEscalationRuns
            .AsNoTracking()
            .Where(x => !x.IsDeleted && x.TicketId == request.TicketId)
            .OrderByDescending(x => x.ExecutedAtUtc)
            .Select(x => x.ToDto())
            .ToListAsync(cancellationToken);
}
