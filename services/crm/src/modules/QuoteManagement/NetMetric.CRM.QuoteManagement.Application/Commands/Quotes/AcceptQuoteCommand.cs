using MediatR;

namespace NetMetric.CRM.QuoteManagement.Application.Commands.Quotes;

public sealed record AcceptQuoteCommand(Guid QuoteId, DateTime? AcceptedAt, string? Note, string? RowVersion) : IRequest;