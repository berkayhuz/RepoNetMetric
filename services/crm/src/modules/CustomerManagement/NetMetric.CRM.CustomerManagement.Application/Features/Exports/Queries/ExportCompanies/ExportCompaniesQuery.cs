using NetMetric.CRM.CustomerManagement.Application.DTOs.Exports;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Exports.Queries.ExportCompanies;

public sealed record ExportCompaniesQuery(
    string? Search = null,
    bool? IsActive = null) : IRequest<ExportFileDto>;
