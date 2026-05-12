using System.Diagnostics;
using System.Text.Json;
using NetMetric.CRM.Core;
using NetMetric.CRM.CustomerManagement.Application.Abstractions.Integration;
using NetMetric.CRM.CustomerManagement.Application.IntegrationEvents;
using NetMetric.CRM.CustomerManagement.Domain.Outbox;
using NetMetric.CRM.CustomerManagement.Infrastructure.Persistence;
using NetMetric.CurrentUser;
using NetMetric.Notification.Contracts.IntegrationEvents.V1;
using NetMetric.Notification.Contracts.Notifications.Enums;
using NetMetric.Notification.Contracts.Notifications.Models;

namespace NetMetric.CRM.CustomerManagement.Infrastructure.Services;

public sealed class CustomerManagementOutbox(
    CustomerManagementDbContext dbContext,
    ICurrentUserService currentUserService) : ICustomerManagementOutbox
{
    private static readonly JsonSerializerOptions SerializerOptions = new(JsonSerializerDefaults.Web);

    public Task EnqueueCustomerCreatedAsync(Customer customer, CancellationToken cancellationToken)
        => EnqueueLifecycleAndNotificationAsync(
            ResolveTenantId(customer.TenantId),
            customer.Id,
            "customer",
            CustomerManagementIntegrationEventNames.CustomerCreated,
            customer.OwnerUserId,
            customer.FullName,
            "Customer created",
            $"Customer {customer.FullName} was created.",
            cancellationToken);

    public Task EnqueueCustomerUpdatedAsync(Customer customer, CancellationToken cancellationToken)
        => EnqueueLifecycleAsync(
            ResolveTenantId(customer.TenantId),
            customer.Id,
            "customer",
            CustomerManagementIntegrationEventNames.CustomerUpdated,
            customer.OwnerUserId,
            new Dictionary<string, string> { ["customerName"] = customer.FullName },
            cancellationToken);

    public Task EnqueueCustomerDeletedAsync(Customer customer, CancellationToken cancellationToken)
        => EnqueueLifecycleAsync(
            ResolveTenantId(customer.TenantId),
            customer.Id,
            "customer",
            CustomerManagementIntegrationEventNames.CustomerDeleted,
            customer.OwnerUserId,
            new Dictionary<string, string> { ["customerName"] = customer.FullName },
            cancellationToken);

    public Task EnqueueContactCreatedAsync(Contact contact, CancellationToken cancellationToken)
        => EnqueueLifecycleAndNotificationAsync(
            ResolveTenantId(contact.TenantId),
            contact.Id,
            "contact",
            CustomerManagementIntegrationEventNames.ContactCreated,
            contact.OwnerUserId,
            contact.FullName,
            "Contact created",
            $"Contact {contact.FullName} was created.",
            cancellationToken);

    public Task EnqueueContactUpdatedAsync(Contact contact, CancellationToken cancellationToken)
        => EnqueueLifecycleAsync(
            ResolveTenantId(contact.TenantId),
            contact.Id,
            "contact",
            CustomerManagementIntegrationEventNames.ContactUpdated,
            contact.OwnerUserId,
            new Dictionary<string, string> { ["contactName"] = contact.FullName },
            cancellationToken);

    public Task EnqueueContactDeletedAsync(Contact contact, CancellationToken cancellationToken)
        => EnqueueLifecycleAsync(
            ResolveTenantId(contact.TenantId),
            contact.Id,
            "contact",
            CustomerManagementIntegrationEventNames.ContactDeleted,
            contact.OwnerUserId,
            new Dictionary<string, string> { ["contactName"] = contact.FullName },
            cancellationToken);

    public Task EnqueuePrimaryContactChangedAsync(Contact contact, CancellationToken cancellationToken)
        => EnqueueLifecycleAsync(
            ResolveTenantId(contact.TenantId),
            contact.Id,
            "contact",
            CustomerManagementIntegrationEventNames.ContactPrimaryChanged,
            contact.OwnerUserId,
            new Dictionary<string, string>
            {
                ["contactName"] = contact.FullName,
                ["customerId"] = contact.CustomerId?.ToString("N") ?? string.Empty,
                ["companyId"] = contact.CompanyId?.ToString("N") ?? string.Empty
            },
            cancellationToken);

    private async Task EnqueueLifecycleAndNotificationAsync(
        Guid tenantId,
        Guid entityId,
        string entityType,
        string eventName,
        Guid? ownerUserId,
        string displayName,
        string subject,
        string textBody,
        CancellationToken cancellationToken)
    {
        await EnqueueLifecycleAsync(
            tenantId,
            entityId,
            entityType,
            eventName,
            ownerUserId,
            new Dictionary<string, string> { ["displayName"] = displayName },
            cancellationToken);

        if (ownerUserId is null || ownerUserId == Guid.Empty)
        {
            return;
        }

        var occurredAt = DateTimeOffset.UtcNow;
        var correlationId = GetCorrelationId();
        var idempotencyKey = $"crm:{tenantId:N}:{eventName}:{entityId:N}:notification";
        var notification = new NotificationRequestedV1(
            Guid.NewGuid(),
            tenantId,
            ownerUserId,
            "crm.customer-management",
            NotificationCategory.System,
            NotificationPriority.Normal,
            new NotificationRecipient(ownerUserId, null, null, null, null),
            [NotificationChannel.InApp],
            subject,
            textBody,
            null,
            new NotificationTemplateData($"crm.{eventName}", new Dictionary<string, string> { ["displayName"] = displayName }),
            new Dictionary<string, string>
            {
                ["entityType"] = entityType,
                ["entityId"] = entityId.ToString("N"),
                ["eventName"] = eventName
            },
            correlationId,
            idempotencyKey,
            occurredAt.UtcDateTime);

        await AddOutboxMessageAsync(
            tenantId,
            NotificationRequestedV1.EventName,
            NotificationRequestedV1.EventVersion,
            NotificationRequestedV1.RoutingKey,
            notification,
            occurredAt,
            correlationId,
            idempotencyKey,
            cancellationToken);
    }

    private Task EnqueueLifecycleAsync(
        Guid tenantId,
        Guid entityId,
        string entityType,
        string eventName,
        Guid? ownerUserId,
        IReadOnlyDictionary<string, string> metadata,
        CancellationToken cancellationToken)
    {
        var occurredAt = DateTimeOffset.UtcNow;
        var correlationId = GetCorrelationId();
        var idempotencyKey = $"crm:{tenantId:N}:{eventName}:{entityId:N}:{occurredAt.ToUnixTimeMilliseconds()}";
        var payload = new CustomerLifecycleIntegrationEventV1(
            Guid.NewGuid(),
            tenantId,
            entityId,
            entityType,
            eventName,
            ownerUserId,
            metadata,
            correlationId,
            occurredAt);

        return AddOutboxMessageAsync(
            tenantId,
            eventName,
            CustomerLifecycleIntegrationEventV1.EventVersion,
            $"{eventName}.v1",
            payload,
            occurredAt,
            correlationId,
            idempotencyKey,
            cancellationToken);
    }

    private async Task AddOutboxMessageAsync<TPayload>(
        Guid tenantId,
        string eventName,
        int eventVersion,
        string routingKey,
        TPayload payload,
        DateTimeOffset occurredAt,
        string? correlationId,
        string? idempotencyKey,
        CancellationToken cancellationToken)
    {
        var message = CustomerManagementOutboxMessage.Create(
            tenantId,
            eventName,
            eventVersion,
            routingKey,
            JsonSerializer.Serialize(payload, SerializerOptions),
            occurredAt,
            correlationId,
            idempotencyKey);

        await dbContext.OutboxMessages.AddAsync(message, cancellationToken);
    }

    private static string? GetCorrelationId()
        => Activity.Current?.TraceId.ToString();

    private Guid ResolveTenantId(Guid tenantId)
        => tenantId == Guid.Empty ? currentUserService.EnsureTenant() : tenantId;
}
