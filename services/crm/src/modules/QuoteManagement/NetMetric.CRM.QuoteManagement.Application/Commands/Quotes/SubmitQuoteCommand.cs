using MediatR;

namespace NetMetric.CRM.QuoteManagement.Application.Commands.Quotes;

public sealed record SubmitQuoteCommand(Guid QuoteId, string? Note, string? RowVersion) : IRequest;