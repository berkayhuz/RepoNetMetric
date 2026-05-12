using MediatR;

namespace NetMetric.CRM.TagManagement.Application.Features.TagGroups.Commands.CreateTagGroup;

public sealed record CreateTagGroupCommand(string Name, string? Color) : IRequest<Guid>;
