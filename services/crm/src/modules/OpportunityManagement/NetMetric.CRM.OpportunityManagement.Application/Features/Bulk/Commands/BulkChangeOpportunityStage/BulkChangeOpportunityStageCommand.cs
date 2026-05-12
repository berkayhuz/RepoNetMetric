using MediatR;
using NetMetric.CRM.Types;

namespace NetMetric.CRM.OpportunityManagement.Application.Features.Bulk.Commands.BulkChangeOpportunityStage;

public sealed record BulkChangeOpportunityStageCommand(IReadOnlyCollection<Guid> OpportunityIds, OpportunityStageType NewStage, string? Note) : IRequest<int>;
