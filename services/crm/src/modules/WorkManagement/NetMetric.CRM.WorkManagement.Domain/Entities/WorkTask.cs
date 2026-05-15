// <copyright file="WorkTask.cs" company="NetMetric">
// Copyright (c) 2026 NetMetric. All rights reserved.
// NetMetric is proprietary software. See the LICENSE file in the repository root.
// </copyright>

using NetMetric.CRM.WorkManagement.Domain.Enums;
using NetMetric.Entities;

namespace NetMetric.CRM.WorkManagement.Domain.Entities;

public sealed class WorkTask : AuditableEntity
{
    private WorkTask()
    {
    }

    public WorkTask(string title, string description, Guid? ownerUserId, DateTime dueAtUtc, int priority)
    {
        Title = string.IsNullOrWhiteSpace(title) ? throw new ArgumentException("Task title is required.", nameof(title)) : title.Trim();
        Description = string.IsNullOrWhiteSpace(description) ? string.Empty : description.Trim();
        OwnerUserId = ownerUserId;
        DueAtUtc = dueAtUtc;
        Priority = Math.Clamp(priority, 1, 5);
        Status = WorkItemStatus.Planned;
    }

    public string Title { get; private set; } = null!;
    public string Description { get; private set; } = string.Empty;
    public Guid? OwnerUserId { get; private set; }
    public DateTime DueAtUtc { get; private set; }
    public int Priority { get; private set; }
    public WorkItemStatus Status { get; private set; }

    public void MarkCompleted() => Status = WorkItemStatus.Completed;
}
