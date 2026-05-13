using MediatR;
using NetMetric.CRM.TagManagement.Contracts.DTOs;

namespace NetMetric.CRM.TagManagement.Application.Features.SmartLabels.Commands.CreateSmartLabelRule;

public sealed record CreateSmartLabelRuleCommand(string Name, string EntityType, string ConditionJson) : IRequest<Guid>;
