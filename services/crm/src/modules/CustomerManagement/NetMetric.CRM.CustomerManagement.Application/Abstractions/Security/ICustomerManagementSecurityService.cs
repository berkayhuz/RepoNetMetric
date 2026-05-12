using NetMetric.CRM.Core;

namespace NetMetric.CRM.CustomerManagement.Application.Abstractions.Security;

public interface ICustomerManagementSecurityService
{
    IQueryable<Company> ApplyCompanyReadScope(IQueryable<Company> query);
    IQueryable<Contact> ApplyContactReadScope(IQueryable<Contact> query);
    IQueryable<Customer> ApplyCustomerReadScope(IQueryable<Customer> query);
    bool CanReadAuditLogs();
    string? Mask(string entityName, string fieldName, string? value);
}
