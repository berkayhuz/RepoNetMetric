using MediatR;
using NetMetric.CRM.OpportunityManagement.Contracts.DTOs;

namespace NetMetric.CRM.OpportunityManagement.Application.Features.LostReasons.Queries.GetLostReasons;

public sealed record GetLostReasonsQuery() : IRequest<IReadOnlyList<LostReasonDto>>;
