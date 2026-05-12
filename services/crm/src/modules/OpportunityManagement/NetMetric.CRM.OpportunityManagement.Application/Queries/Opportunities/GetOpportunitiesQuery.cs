using MediatR;
using NetMetric.CRM.OpportunityManagement.Contracts.DTOs;
using NetMetric.CRM.Types;
using NetMetric.Pagination;

namespace NetMetric.CRM.OpportunityManagement.Application.Queries.Opportunities;

public sealed record GetOpportunitiesQuery(string? Search, OpportunityStageType? Stage, OpportunityStatusType? Status, Guid? OwnerUserId, Guid? LeadId, Guid? CustomerId, bool? IsActive, int PageNumber = 1, int PageSize = 20) : IRequest<PagedResult<OpportunityListItemDto>>;
