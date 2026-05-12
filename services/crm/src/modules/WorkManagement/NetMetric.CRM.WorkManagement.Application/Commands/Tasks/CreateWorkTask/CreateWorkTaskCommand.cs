using NetMetric.CRM.WorkManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.WorkManagement.Application.Commands.Tasks.CreateWorkTask;

public sealed record CreateWorkTaskCommand(string Title, string Description, Guid? OwnerUserId, DateTime DueAtUtc, int Priority) : IRequest<WorkTaskDto>;
