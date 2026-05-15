// <copyright file="OutboxContracts.cs" company="NetMetric">
// Copyright (c) 2026 NetMetric. All rights reserved.
// NetMetric is proprietary software. See the LICENSE file in the repository root.
// </copyright>

namespace NetMetric.Account.Application.Abstractions.Outbox;

public interface IAccountOutboxWriter
{
    Task EnqueueAsync<TPayload>(
        Guid tenantId,
        string type,
        TPayload payload,
        string? correlationId,
        CancellationToken cancellationToken = default);
}
