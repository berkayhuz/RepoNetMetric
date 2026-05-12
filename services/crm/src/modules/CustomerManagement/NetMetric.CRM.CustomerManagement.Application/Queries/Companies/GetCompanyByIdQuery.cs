using NetMetric.CRM.CustomerManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Queries.Companies;

public sealed record GetCompanyByIdQuery(Guid CompanyId) : IRequest<CompanyDetailDto?>;
