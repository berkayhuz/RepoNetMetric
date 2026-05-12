using MediatR;
using NetMetric.CRM.OpportunityManagement.Contracts.DTOs;

namespace NetMetric.CRM.OpportunityManagement.Application.Features.Quotes.Commands.CreateQuote;

public sealed record CreateQuoteCommand(Guid OpportunityId, string QuoteNumber, DateTime QuoteDate, DateTime? ValidUntil, string? TermsAndConditions, Guid? OwnerUserId, string CurrencyCode, decimal ExchangeRate, IReadOnlyList<CreateQuoteItemModel> Items) : IRequest<QuoteDetailDto>;
