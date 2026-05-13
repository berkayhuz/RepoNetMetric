using MediatR;
using NetMetric.CRM.TagManagement.Contracts.DTOs;

namespace NetMetric.CRM.TagManagement.Application.Features.Classifications.Commands.CreateClassificationScheme;

public sealed record CreateClassificationSchemeCommand(string Name, string EntityType) : IRequest<Guid>;
