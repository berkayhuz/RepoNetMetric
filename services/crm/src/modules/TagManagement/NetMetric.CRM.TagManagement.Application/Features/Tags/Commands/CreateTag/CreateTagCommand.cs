using MediatR;

namespace NetMetric.CRM.TagManagement.Application.Features.Tags.Commands.CreateTag;

public sealed record CreateTagCommand(string Name, string Color) : IRequest<Guid>;
