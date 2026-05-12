using Microsoft.EntityFrameworkCore;
using NetMetric.CRM.Core;
using NetMetric.CRM.CustomerManagement.Application.Abstractions;
using NetMetric.CRM.CustomerManagement.Application.Abstractions.Integration;
using NetMetric.CRM.CustomerManagement.Application.Commands.Contacts;
using NetMetric.CRM.CustomerManagement.Contracts.DTOs;
using NetMetric.CRM.CustomerManagement.Infrastructure.Persistence;
using NetMetric.Exceptions;
using NetMetric.Repository;

namespace NetMetric.CRM.CustomerManagement.Infrastructure.Services;

public sealed class ContactAdministrationService(
    CustomerManagementDbContext dbContext,
    IRepository<Contact, Guid> contactRepository,
    ICustomerManagementOutbox outbox)
    : IContactAdministrationService
{
    private readonly CustomerManagementDbContext _dbContext = dbContext;
    private readonly IRepository<Contact, Guid> _contactRepository = contactRepository;
    private readonly ICustomerManagementOutbox _outbox = outbox;

    public async Task<ContactDetailDto> CreateAsync(CreateContactCommand request, CancellationToken cancellationToken = default)
    {
        var entity = new Contact
        {
            FirstName = request.FirstName.Trim(),
            LastName = request.LastName.Trim(),
            Title = TrimToNull(request.Title),
            Email = TrimToNull(request.Email),
            MobilePhone = TrimToNull(request.MobilePhone),
            WorkPhone = TrimToNull(request.WorkPhone),
            PersonalPhone = TrimToNull(request.PersonalPhone),
            BirthDate = request.BirthDate,
            Gender = request.Gender,
            Department = TrimToNull(request.Department),
            JobTitle = TrimToNull(request.JobTitle),
            Description = TrimToNull(request.Description),
            OwnerUserId = request.OwnerUserId,
            CompanyId = request.CompanyId,
            CustomerId = request.CustomerId,
            IsPrimaryContact = request.IsPrimaryContact
        };

        entity.SetNotes(request.Notes);

        await EnsurePrimaryContactConsistencyAsync(entity, null, cancellationToken);
        await _contactRepository.AddAsync(entity, cancellationToken);
        await _outbox.EnqueueContactCreatedAsync(entity, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        entity = await LoadContactAsync(entity.Id, cancellationToken);
        return entity.ToDetailDto();
    }

    public async Task<ContactDetailDto> UpdateAsync(UpdateContactCommand request, CancellationToken cancellationToken = default)
    {
        var entity = await _dbContext.Contacts
            .FirstOrDefaultAsync(x => x.Id == request.ContactId, cancellationToken)
            ?? throw new NotFoundAppException("Contact not found.");

        ConcurrencyHelper.ApplyRowVersion(_dbContext, entity, request.RowVersion);

        entity.FirstName = request.FirstName.Trim();
        entity.LastName = request.LastName.Trim();
        entity.Title = TrimToNull(request.Title);
        entity.Email = TrimToNull(request.Email);
        entity.MobilePhone = TrimToNull(request.MobilePhone);
        entity.WorkPhone = TrimToNull(request.WorkPhone);
        entity.PersonalPhone = TrimToNull(request.PersonalPhone);
        entity.BirthDate = request.BirthDate;
        entity.Gender = request.Gender;
        entity.Department = TrimToNull(request.Department);
        entity.JobTitle = TrimToNull(request.JobTitle);
        entity.Description = TrimToNull(request.Description);
        entity.OwnerUserId = request.OwnerUserId;
        entity.CompanyId = request.CompanyId;
        entity.CustomerId = request.CustomerId;
        entity.IsPrimaryContact = request.IsPrimaryContact;
        entity.SetNotes(request.Notes);

        await EnsurePrimaryContactConsistencyAsync(entity, entity.Id, cancellationToken);
        await _outbox.EnqueueContactUpdatedAsync(entity, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        entity = await LoadContactAsync(entity.Id, cancellationToken);
        return entity.ToDetailDto();
    }

    public async Task SetPrimaryAsync(Guid contactId, CancellationToken cancellationToken = default)
    {
        var entity = await _dbContext.Contacts.FirstOrDefaultAsync(x => x.Id == contactId, cancellationToken)
            ?? throw new NotFoundAppException("Contact not found.");

        entity.IsPrimaryContact = true;
        await EnsurePrimaryContactConsistencyAsync(entity, entity.Id, cancellationToken);
        await _outbox.EnqueuePrimaryContactChangedAsync(entity, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task SoftDeleteAsync(Guid contactId, CancellationToken cancellationToken = default)
    {
        var entity = await _contactRepository.GetByIdAsync(contactId, cancellationToken)
            ?? throw new NotFoundAppException("Contact not found.");

        _contactRepository.Remove(entity);
        await _outbox.EnqueueContactDeletedAsync(entity, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    private async Task EnsurePrimaryContactConsistencyAsync(Contact target, Guid? selfId, CancellationToken cancellationToken)
    {
        if (!target.IsPrimaryContact)
            return;

        if (target.CompanyId.HasValue)
        {
            var companyContacts = await _dbContext.Contacts
                .Where(x => x.CompanyId == target.CompanyId && (!selfId.HasValue || x.Id != selfId.Value))
                .ToListAsync(cancellationToken);

            companyContacts.ForEach(x => x.IsPrimaryContact = false);
        }

        if (target.CustomerId.HasValue)
        {
            var customerContacts = await _dbContext.Contacts
                .Where(x => x.CustomerId == target.CustomerId && (!selfId.HasValue || x.Id != selfId.Value))
                .ToListAsync(cancellationToken);

            customerContacts.ForEach(x => x.IsPrimaryContact = false);
        }
    }

    private Task<Contact> LoadContactAsync(Guid contactId, CancellationToken cancellationToken)
        => _dbContext.Contacts
            .Include(x => x.Company)
            .Include(x => x.Customer)
            .FirstAsync(x => x.Id == contactId, cancellationToken);

    private static string? TrimToNull(string? value)
        => string.IsNullOrWhiteSpace(value) ? null : value.Trim();
}
