using MediatR;
using NetMetric.CRM.QuoteManagement.Contracts.DTOs;

namespace NetMetric.CRM.QuoteManagement.Application.Queries.Quotes;

public sealed record GetCpqWorkspaceQuery() : IRequest<CpqWorkspaceDto>;
