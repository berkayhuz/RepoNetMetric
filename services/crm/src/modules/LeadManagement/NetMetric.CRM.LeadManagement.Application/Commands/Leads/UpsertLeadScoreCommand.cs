using MediatR;
using NetMetric.CRM.LeadManagement.Contracts.DTOs;

namespace NetMetric.CRM.LeadManagement.Application.Commands.Leads;

public sealed record UpsertLeadScoreCommand(Guid LeadId, decimal Score, string? ScoreReason) : IRequest<LeadScoreDto>;
