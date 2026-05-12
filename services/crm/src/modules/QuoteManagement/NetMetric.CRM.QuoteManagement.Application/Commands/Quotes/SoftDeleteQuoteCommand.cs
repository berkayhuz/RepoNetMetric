using MediatR;

namespace NetMetric.CRM.QuoteManagement.Application.Commands.Quotes;

public sealed record SoftDeleteQuoteCommand(Guid QuoteId) : IRequest;