namespace NetMetric.CRM.OpportunityManagement.Contracts.DTOs;

public sealed record QuoteDetailDto(Guid Id, string QuoteNumber, Guid? OpportunityId, DateTime QuoteDate, DateTime? ValidUntil, decimal? SubTotal, decimal? DiscountTotal, decimal? TaxTotal, decimal? GrandTotal, string? TermsAndConditions, Guid? OwnerUserId, string CurrencyCode, decimal? ExchangeRate, IReadOnlyList<QuoteItemDto> Items, string RowVersion);
