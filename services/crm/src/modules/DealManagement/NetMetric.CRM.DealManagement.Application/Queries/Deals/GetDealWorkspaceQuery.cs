using NetMetric.CRM.DealManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.DealManagement.Application.Queries.Deals;

public sealed record GetDealWorkspaceQuery(Guid DealId) : IRequest<DealWorkspaceDto?>;