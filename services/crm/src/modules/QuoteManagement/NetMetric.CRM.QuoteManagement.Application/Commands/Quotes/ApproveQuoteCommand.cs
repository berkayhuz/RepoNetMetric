using MediatR;

namespace NetMetric.CRM.QuoteManagement.Application.Commands.Quotes;

public sealed record ApproveQuoteCommand(Guid QuoteId, string? Note, string? RowVersion) : IRequest;
