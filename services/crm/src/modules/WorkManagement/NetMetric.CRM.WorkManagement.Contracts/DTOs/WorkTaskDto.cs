namespace NetMetric.CRM.WorkManagement.Contracts.DTOs;

public sealed record WorkTaskDto(Guid Id, string Title, string Description, Guid? OwnerUserId, DateTime DueAtUtc, int Priority, string Status);
