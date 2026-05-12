using NetMetric.CRM.CustomerManagement.Application.DTOs.Exports;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Exports.Queries.ExportContacts;

public sealed record ExportContactsQuery(
    string? Search = null,
    bool? IsActive = null) : IRequest<ExportFileDto>;
