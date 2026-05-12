using MediatR;
using NetMetric.CRM.OpportunityManagement.Contracts.DTOs;

namespace NetMetric.CRM.OpportunityManagement.Application.Queries.Opportunities;

public sealed record GetOpportunityByIdQuery(Guid OpportunityId) : IRequest<OpportunityDetailDto?>;
