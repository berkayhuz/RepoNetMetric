using MediatR;
using NetMetric.CRM.Types;

namespace NetMetric.CRM.OpportunityManagement.Application.Commands;

public sealed record ChangeOpportunityStageCommand(Guid OpportunityId, OpportunityStageType NewStage, string? Note, string? RowVersion) : IRequest;
