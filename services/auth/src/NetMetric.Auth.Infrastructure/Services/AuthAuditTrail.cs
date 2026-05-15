// <copyright file="AuthAuditTrail.cs" company="NetMetric">
// Copyright (c) 2026 NetMetric. All rights reserved.
// NetMetric is proprietary software. See the LICENSE file in the repository root.
// </copyright>

using NetMetric.Auth.Application.Abstractions;
using NetMetric.Auth.Application.Records;
using NetMetric.Auth.Domain.Entities;
using NetMetric.Auth.Infrastructure.Persistence;

namespace NetMetric.Auth.Infrastructure.Services;

public sealed class AuthAuditTrail(AuthDbContext dbContext) : IAuthAuditTrail
{
    public async Task WriteAsync(AuthAuditRecord record, CancellationToken cancellationToken)
    {
        await dbContext.AuthAuditEvents.AddAsync(new AuthAuditEvent
        {
            TenantId = record.TenantId,
            UserId = record.UserId,
            SessionId = record.SessionId,
            EventType = record.EventType,
            Outcome = record.Outcome,
            Identity = record.Identity,
            IpAddress = record.IpAddress,
            UserAgent = record.UserAgent,
            CorrelationId = record.CorrelationId,
            TraceId = record.TraceId,
            Metadata = record.Metadata
        }, cancellationToken);
    }
}
