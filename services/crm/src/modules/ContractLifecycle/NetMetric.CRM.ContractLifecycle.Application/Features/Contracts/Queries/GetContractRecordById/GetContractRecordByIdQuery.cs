using MediatR;
using NetMetric.CRM.ContractLifecycle.Contracts.DTOs;

namespace NetMetric.CRM.ContractLifecycle.Application.Features.Contracts.Queries.GetContractRecordById;

public sealed record GetContractRecordByIdQuery(Guid Id) : IRequest<ContractLifecycleSummaryDto?>;
