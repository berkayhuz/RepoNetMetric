using NetMetric.CRM.QuoteManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.QuoteManagement.Application.Commands.Quotes;

public sealed record CreateRevisionCommand(Guid QuoteId, string NewQuoteNumber) : IRequest<QuoteDetailDto>;