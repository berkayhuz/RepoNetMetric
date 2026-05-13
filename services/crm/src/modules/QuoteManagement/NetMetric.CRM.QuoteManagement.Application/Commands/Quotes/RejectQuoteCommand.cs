using MediatR;

namespace NetMetric.CRM.QuoteManagement.Application.Commands.Quotes;

public sealed record RejectQuoteCommand(Guid QuoteId, string Reason, string? RowVersion) : IRequest;
