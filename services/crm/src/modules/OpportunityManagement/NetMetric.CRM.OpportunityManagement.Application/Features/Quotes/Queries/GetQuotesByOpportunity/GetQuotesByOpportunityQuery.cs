using MediatR;
using NetMetric.CRM.OpportunityManagement.Contracts.DTOs;

namespace NetMetric.CRM.OpportunityManagement.Application.Features.Quotes.Queries.GetQuotesByOpportunity;

public sealed record GetQuotesByOpportunityQuery(Guid OpportunityId) : IRequest<IReadOnlyList<QuoteDetailDto>>;
