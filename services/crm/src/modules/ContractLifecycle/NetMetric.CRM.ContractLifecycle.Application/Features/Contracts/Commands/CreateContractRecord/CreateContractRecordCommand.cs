using MediatR;
using NetMetric.CRM.ContractLifecycle.Contracts.DTOs;

namespace NetMetric.CRM.ContractLifecycle.Application.Features.Contracts.Commands.CreateContractRecord;

public sealed record CreateContractRecordCommand(
    string Code,
    string Name,
    string? Description) : IRequest<ContractLifecycleSummaryDto>;
