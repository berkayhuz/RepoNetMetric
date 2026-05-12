using MediatR;

namespace NetMetric.CRM.QuoteManagement.Application.Commands.Quotes;

public sealed record DeclineQuoteCommand(Guid QuoteId, DateTime? DeclinedAt, string Reason, string? RowVersion) : IRequest;