using NetMetric.CRM.LeadManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.LeadManagement.Application.Commands.Leads;

public sealed record UpsertLeadScoreCommand(Guid LeadId, decimal Score, string? ScoreReason) : IRequest<LeadScoreDto>;
