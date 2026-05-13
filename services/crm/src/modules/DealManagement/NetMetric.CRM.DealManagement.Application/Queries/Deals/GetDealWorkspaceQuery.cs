using MediatR;
using NetMetric.CRM.DealManagement.Contracts.DTOs;

namespace NetMetric.CRM.DealManagement.Application.Queries.Deals;

public sealed record GetDealWorkspaceQuery(Guid DealId) : IRequest<DealWorkspaceDto?>;
