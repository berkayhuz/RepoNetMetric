using MediatR;
using NetMetric.CRM.CustomerManagement.Contracts.DTOs;

namespace NetMetric.CRM.CustomerManagement.Application.Queries.Companies;

public sealed record GetCompanyByIdQuery(Guid CompanyId) : IRequest<CompanyDetailDto?>;
