using NetMetric.CRM.Types;

namespace NetMetric.CRM.QuoteManagement.Contracts.DTOs;

public sealed record QuoteListItemDto(Guid Id, string QuoteNumber, string? ProposalTitle, QuoteStatusType Status, DateTime QuoteDate, DateTime? ValidUntil, decimal? GrandTotal, string CurrencyCode, Guid? OpportunityId, Guid? CustomerId, Guid? OwnerUserId, int RevisionNumber, bool IsActive);
