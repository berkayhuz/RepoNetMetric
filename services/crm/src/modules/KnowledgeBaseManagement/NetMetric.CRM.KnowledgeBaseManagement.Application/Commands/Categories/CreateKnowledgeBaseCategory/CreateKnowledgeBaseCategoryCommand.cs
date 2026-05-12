using NetMetric.CRM.KnowledgeBaseManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.KnowledgeBaseManagement.Application.Commands.Categories.CreateKnowledgeBaseCategory;

public sealed record CreateKnowledgeBaseCategoryCommand(string Name, string? Description, int SortOrder) : IRequest<KnowledgeBaseCategoryDto>;
