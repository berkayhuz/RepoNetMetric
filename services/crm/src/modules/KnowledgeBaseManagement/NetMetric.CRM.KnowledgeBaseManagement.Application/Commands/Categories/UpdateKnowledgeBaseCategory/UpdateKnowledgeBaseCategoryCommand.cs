using MediatR;
using NetMetric.CRM.KnowledgeBaseManagement.Contracts.DTOs;

namespace NetMetric.CRM.KnowledgeBaseManagement.Application.Commands.Categories.UpdateKnowledgeBaseCategory;

public sealed record UpdateKnowledgeBaseCategoryCommand(Guid CategoryId, string Name, string? Description, int SortOrder) : IRequest<KnowledgeBaseCategoryDto>;
