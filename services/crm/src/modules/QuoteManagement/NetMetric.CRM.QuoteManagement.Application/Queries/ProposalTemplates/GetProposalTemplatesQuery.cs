using NetMetric.CRM.QuoteManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.QuoteManagement.Application.Queries.ProposalTemplates;

public sealed record GetProposalTemplatesQuery(bool? IsActive) : IRequest<IReadOnlyList<ProposalTemplateDto>>;