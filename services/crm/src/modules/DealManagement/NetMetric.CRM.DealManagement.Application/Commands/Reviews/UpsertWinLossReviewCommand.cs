using MediatR;
using NetMetric.CRM.DealManagement.Contracts.DTOs;

namespace NetMetric.CRM.DealManagement.Application.Commands.Reviews;

public sealed record UpsertWinLossReviewCommand(Guid DealId, string Outcome, string? Summary, string? Strengths, string? Risks, string? CompetitorName, decimal? CompetitorPrice, string? CustomerFeedback, string? RowVersion) : IRequest<WinLossReviewDto>;
