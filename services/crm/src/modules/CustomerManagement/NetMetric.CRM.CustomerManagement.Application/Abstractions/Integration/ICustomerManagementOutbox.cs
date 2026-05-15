// <copyright file="ICustomerManagementOutbox.cs" company="NetMetric">
// Copyright (c) 2026 NetMetric. All rights reserved.
// NetMetric is proprietary software. See the LICENSE file in the repository root.
// </copyright>

using NetMetric.CRM.Core;

namespace NetMetric.CRM.CustomerManagement.Application.Abstractions.Integration;

public interface ICustomerManagementOutbox
{
    Task EnqueueCustomerCreatedAsync(Customer customer, CancellationToken cancellationToken);

    Task EnqueueCustomerUpdatedAsync(Customer customer, CancellationToken cancellationToken);

    Task EnqueueCustomerDeletedAsync(Customer customer, CancellationToken cancellationToken);

    Task EnqueueContactCreatedAsync(Contact contact, CancellationToken cancellationToken);

    Task EnqueueContactUpdatedAsync(Contact contact, CancellationToken cancellationToken);

    Task EnqueueContactDeletedAsync(Contact contact, CancellationToken cancellationToken);

    Task EnqueuePrimaryContactChangedAsync(Contact contact, CancellationToken cancellationToken);
}
