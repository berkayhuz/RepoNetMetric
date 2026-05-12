using NetMetric.CRM.QuoteManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.QuoteManagement.Application.Queries.Quotes;

public sealed record GetCpqWorkspaceQuery() : IRequest<CpqWorkspaceDto>;
