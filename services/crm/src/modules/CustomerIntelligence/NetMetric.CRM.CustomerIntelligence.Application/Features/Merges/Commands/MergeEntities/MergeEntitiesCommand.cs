using MediatR;
using NetMetric.CRM.CustomerIntelligence.Contracts.DTOs;

namespace NetMetric.CRM.CustomerIntelligence.Application.Features.Merges.Commands.MergeEntities;

public sealed record MergeEntitiesCommand(string PrimaryEntityType, Guid PrimaryEntityId, string SecondaryEntityType, Guid SecondaryEntityId, string Reason) : IRequest<Guid>;
