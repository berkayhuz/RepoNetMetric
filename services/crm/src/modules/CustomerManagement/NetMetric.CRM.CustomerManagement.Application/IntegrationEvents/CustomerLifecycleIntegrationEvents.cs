// <copyright file="CustomerLifecycleIntegrationEvents.cs" company="NetMetric">
// Copyright (c) 2026 NetMetric. All rights reserved.
// NetMetric is proprietary software. See the LICENSE file in the repository root.
// </copyright>

namespace NetMetric.CRM.CustomerManagement.Application.IntegrationEvents;

public sealed record CustomerLifecycleIntegrationEventV1(
    Guid EventId,
    Guid TenantId,
    Guid EntityId,
    string EntityType,
    string EventType,
    Guid? OwnerUserId,
    IReadOnlyDictionary<string, string> Metadata,
    string? CorrelationId,
    DateTimeOffset OccurredAtUtc)
{
    public const int EventVersion = 1;
}

public static class CustomerManagementIntegrationEventNames
{
    public const string CustomerCreated = "crm.customer.created";
    public const string CustomerUpdated = "crm.customer.updated";
    public const string CustomerDeleted = "crm.customer.deleted";
    public const string ContactCreated = "crm.contact.created";
    public const string ContactUpdated = "crm.contact.updated";
    public const string ContactDeleted = "crm.contact.deleted";
    public const string ContactPrimaryChanged = "crm.contact.primary_changed";
}
