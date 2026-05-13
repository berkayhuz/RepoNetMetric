using MediatR;
using NetMetric.CRM.CustomerManagement.Application.DTOs.Exports;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Exports.Queries.ExportContacts;

public sealed record ExportContactsQuery(
    string? Search = null,
    bool? IsActive = null) : IRequest<ExportFileDto>;
