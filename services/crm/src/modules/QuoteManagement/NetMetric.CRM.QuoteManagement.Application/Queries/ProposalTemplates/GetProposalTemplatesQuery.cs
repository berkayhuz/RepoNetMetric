using MediatR;
using NetMetric.CRM.QuoteManagement.Contracts.DTOs;

namespace NetMetric.CRM.QuoteManagement.Application.Queries.ProposalTemplates;

public sealed record GetProposalTemplatesQuery(bool? IsActive) : IRequest<IReadOnlyList<ProposalTemplateDto>>;
