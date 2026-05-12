using NetMetric.CRM.QuoteManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.QuoteManagement.Application.Queries.Quotes;

public sealed record GetQuoteByIdQuery(Guid QuoteId) : IRequest<QuoteDetailDto?>;