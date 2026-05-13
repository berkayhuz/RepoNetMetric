using MediatR;

namespace NetMetric.CRM.QuoteManagement.Application.Commands.ProposalTemplates;

public sealed record DeleteProposalTemplateCommand(Guid TemplateId) : IRequest;
