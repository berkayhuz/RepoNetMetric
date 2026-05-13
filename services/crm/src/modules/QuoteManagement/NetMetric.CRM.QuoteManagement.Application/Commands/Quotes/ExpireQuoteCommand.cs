using MediatR;

namespace NetMetric.CRM.QuoteManagement.Application.Commands.Quotes;

public sealed record ExpireQuoteCommand(Guid QuoteId, DateTime? ExpiredAt, string? Note, string? RowVersion) : IRequest;
