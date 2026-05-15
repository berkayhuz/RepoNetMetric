// <copyright file="OutboxEventTypes.cs" company="NetMetric">
// Copyright (c) 2026 NetMetric. All rights reserved.
// NetMetric is proprietary software. See the LICENSE file in the repository root.
// </copyright>

namespace NetMetric.Account.Infrastructure.Outbox;

public static class OutboxEventTypes
{
    public const string SecurityNotificationRequested = "account.security_notification.requested";
    public const string SecurityEventRaised = "account.security_event.raised";
}
