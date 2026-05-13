using MediatR;

namespace NetMetric.CRM.QuoteManagement.Application.Commands.Quotes;

public sealed record MarkQuoteSentCommand(Guid QuoteId, DateTime? SentAt, string? Note, string? RowVersion) : IRequest;
