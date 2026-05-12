using MediatR;
using NetMetric.CRM.CustomerManagement.Application.DTOs.Imports;
using NetMetric.Idempotency;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Imports.Commands.ImportCustomers;

public sealed record ImportCustomersCommand(
    Guid TenantId,
    string? IdempotencyKey,
    string CsvContent,
    bool DryRun = true,
    bool UpsertExisting = true,
    char Separator = ',')
    : IRequest<ImportExecutionResultDto>, IIdempotentCommand;
