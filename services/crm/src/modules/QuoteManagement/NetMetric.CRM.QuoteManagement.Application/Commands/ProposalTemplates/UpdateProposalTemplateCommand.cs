using NetMetric.CRM.QuoteManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.QuoteManagement.Application.Commands.ProposalTemplates;

public sealed record UpdateProposalTemplateCommand(Guid TemplateId, string Name, string? SubjectTemplate, string BodyTemplate, bool IsDefault, bool IsActive, string? Notes) : IRequest<ProposalTemplateDto>;