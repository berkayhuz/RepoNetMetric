using MediatR;
using NetMetric.CRM.CustomerIntelligence.Contracts.DTOs;

namespace NetMetric.CRM.CustomerIntelligence.Application.Features.Duplicates.Commands.DetectDuplicates;

public sealed record DetectDuplicatesCommand(Guid SubjectId, string EntityType) : IRequest<Guid>;
