using MediatR;
using NetMetric.CRM.CustomerManagement.Application.DTOs.Imports;
using NetMetric.Idempotency;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Imports.Commands.ImportContacts;

public sealed record ImportContactsCommand(
    Guid TenantId,
    string? IdempotencyKey,
    string CsvContent,
    bool DryRun = true,
    bool UpsertExisting = true,
    char Separator = ',')
    : IRequest<ImportExecutionResultDto>, IIdempotentCommand;
