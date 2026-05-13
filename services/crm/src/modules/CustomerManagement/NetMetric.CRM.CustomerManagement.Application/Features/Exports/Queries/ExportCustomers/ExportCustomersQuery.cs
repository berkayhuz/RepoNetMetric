using MediatR;
using NetMetric.CRM.CustomerManagement.Application.DTOs.Exports;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Exports.Queries.ExportCustomers;

public sealed record ExportCustomersQuery(
    string? Search = null,
    bool? IsActive = null,
    bool? IsVip = null) : IRequest<ExportFileDto>;
