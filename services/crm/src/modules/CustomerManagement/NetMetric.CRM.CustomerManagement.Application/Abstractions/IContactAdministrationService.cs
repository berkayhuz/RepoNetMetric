using NetMetric.CRM.CustomerManagement.Application.Commands.Contacts;
using NetMetric.CRM.CustomerManagement.Contracts.DTOs;

namespace NetMetric.CRM.CustomerManagement.Application.Abstractions;

public interface IContactAdministrationService
{
    Task<ContactDetailDto> CreateAsync(CreateContactCommand request, CancellationToken cancellationToken = default);
    Task<ContactDetailDto> UpdateAsync(UpdateContactCommand request, CancellationToken cancellationToken = default);
    Task SetPrimaryAsync(Guid contactId, CancellationToken cancellationToken = default);
    Task SoftDeleteAsync(Guid contactId, CancellationToken cancellationToken = default);
}
