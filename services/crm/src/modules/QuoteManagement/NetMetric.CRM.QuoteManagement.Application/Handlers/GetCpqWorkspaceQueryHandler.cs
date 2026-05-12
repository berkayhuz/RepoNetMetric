using NetMetric.CRM.QuoteManagement.Application.Abstractions.Persistence;
using NetMetric.CRM.QuoteManagement.Application.Common;
using NetMetric.CRM.QuoteManagement.Application.Queries.Quotes;
using NetMetric.CRM.QuoteManagement.Contracts.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace NetMetric.CRM.QuoteManagement.Application.Handlers;

public sealed class GetCpqWorkspaceQueryHandler(IQuoteManagementDbContext dbContext) : IRequestHandler<GetCpqWorkspaceQuery, CpqWorkspaceDto>
{
    public async Task<CpqWorkspaceDto> Handle(GetCpqWorkspaceQuery request, CancellationToken cancellationToken)
    {
        var rules = await dbContext.ProductRules.AsNoTracking().OrderBy(x => x.Name).ToListAsync(cancellationToken);
        var bundles = await dbContext.ProductBundles.Include(x => x.Items).AsNoTracking().OrderBy(x => x.Name).ToListAsync(cancellationToken);
        var playbooks = await dbContext.GuidedSellingPlaybooks.AsNoTracking().OrderBy(x => x.Name).ToListAsync(cancellationToken);

        return new CpqWorkspaceDto(
            rules.Select(x => x.ToDto()).ToList(),
            bundles.Select(x => x.ToDto()).ToList(),
            playbooks.Select(x => x.ToDto()).ToList());
    }
}
