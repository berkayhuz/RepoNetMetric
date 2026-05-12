using NetMetric.CRM.QuoteManagement.Application.Common;
using NetMetric.CRM.QuoteManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.QuoteManagement.Application.Commands.Quotes;

public sealed record UpdateQuoteCommand(Guid QuoteId, string QuoteNumber, string? ProposalTitle, string? ProposalSummary, string? ProposalBody, DateTime QuoteDate, DateTime? ValidUntil, Guid? OpportunityId, Guid? CustomerId, Guid? OwnerUserId, string CurrencyCode, decimal ExchangeRate, string? TermsAndConditions, Guid? ProposalTemplateId, IReadOnlyList<QuoteLineInput> Items, string RowVersion) : IRequest<QuoteDetailDto>;
